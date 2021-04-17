import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { Note, Task, Event as EventNote, Notes, isEvent, NotesOrganized, isTask } from '../types'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Notes | undefined
  notesChanged = new Set<Note | Task | EventNote>()
  notesChangedProperties = new Map<Note | Task | EventNote, Set<any>>()
  newNote: Note | Task | EventNote | undefined
  notesOrigin = new Map<Note | Task | EventNote, any>()
  notesOrganized: NotesOrganized | undefined

  private isNotesChanged = true

  constructor(
    private http: HttpClient,
  ) { }

  // TODO remove ?authorId=userId when backend is implemented
  getNotes(userId: string='123exampleId'): Observable<{notes: Notes, notesOrganized: NotesOrganized}> {

    if (!this.isNotesChanged && this.notes && this.notesOrganized) return of({ notes: this.notes, notesOrganized: this.notesOrganized })

    return this.http.get<Notes>(`api/notes/?authorId=${userId}`).pipe(
      // map(notes => notes.filter(note => note.authorId === userId)),

      map(notes => {
        notes.forEach(note => this.transformDates(note))

        this.notesChanged.clear()
        this.notesChangedProperties.clear()
        this.notesOrigin.clear()
        this.isNotesChanged = false

        const proxyNotes = notes.map(note => {

          const noteCopy: any = { ...note }
          noteCopy.createdAt = new Date(note.createdAt)
          if (noteCopy.categories) noteCopy.categories = [...noteCopy.categories]
          if (noteCopy.dueDate) noteCopy.dueDate = new Date(noteCopy.dueDate)
          if (noteCopy.startDate) noteCopy.startDate = new Date(noteCopy.startDate)
          if (noteCopy.endDate) noteCopy.endDate = new Date(noteCopy.endDate)
          this.notesOrigin.set(note, noteCopy)

          this.notesChangedProperties.set(note, new Set())

          return this.defineProxie(note)
        })

        this.notes = proxyNotes

        this.notesOrganized = this.getOrganizedNotes(proxyNotes)

        return { notes: this.notes, notesOrganized: this.notesOrganized }
      }),
      catchError((err: Error) => of({ notes: [], notesOrganized: { notes: [], tasks: [], events: [] } }))

    )
  }

  getNote(noteId: string): Observable<Note | Task | EventNote | undefined> {
    if (noteId === 'new-note') return of(this.createNewNote('note'))
    if (!this.isNotesChanged && this.notes) return of(this.notes.find(note => note.id === noteId))

    return this.http.get<Note | Task | EventNote>(`api/notes/${noteId}`).pipe(
      map(note => {
        this.transformDates(note)

        this.notesChanged.clear()
        this.notesChangedProperties.clear()
        this.notesOrigin.clear()

        // TODO this part is repeated several times
        const noteCopy: any = { ...note }
        noteCopy.createdAt = new Date(note.createdAt)
        if (noteCopy.categories) noteCopy.categories = [...noteCopy.categories]
        if (noteCopy.dueDate) noteCopy.dueDate = new Date(noteCopy.dueDate)
        if (noteCopy.startDate) noteCopy.startDate = new Date(noteCopy.startDate)
        if (noteCopy.endDate) noteCopy.endDate = new Date(noteCopy.endDate)
        this.notesOrigin.set(note, noteCopy)

        const proxieNote = this.defineProxie(note)
        this.notes = [proxieNote]

        this.notesChangedProperties.set(note, new Set())

        return proxieNote
      }),
      catchError((err: Error) => of(undefined))
    )
  }

  // Return requests to put all changed notes and delete them from notesChanged
  putNotes() {

    if (this.notes) {
      const putRequests: Observable<Note | Task | EventNote | null | boolean>[] = []
      this.notesChanged.forEach(note => putRequests.push(this.http.put<Note | Task | EventNote>(`api/notes`, note).pipe(
        tap({
          complete: () => {

            const noteCopy: any = { ...note }
            noteCopy.createdAt = new Date(note.createdAt)
            if (noteCopy.categories) noteCopy.categories = [...noteCopy.categories]
            if (noteCopy.dueDate) noteCopy.dueDate = new Date(noteCopy.dueDate)
            if (noteCopy.startDate) noteCopy.startDate = new Date(noteCopy.startDate)
            if (noteCopy.endDate) noteCopy.endDate = new Date(noteCopy.endDate)
            this.notesOrigin.set(note, noteCopy)

            this.notesChanged.delete(note)
            this.notesChangedProperties.get(note)?.clear()
            this.isNotesChanged = true
          }
        }),
        catchError((err: Error) => of(false))
      )))

      return putRequests
    }

    return [of(null)]

  }

  postNewNote() {

    if (this.newNote) {
      delete (this.newNote as any)['id']
      this.newNote.authorId = this.newNote.authorId || '123exampleId'

      return this.http.post<Note | Task | EventNote>(`api/notes`, this.newNote).pipe(
        tap({
          complete: () => {

            if (this.newNote) {
              const noteCopy: any = { ...this.newNote }
              noteCopy.createdAt = new Date(this.newNote.createdAt)
              if (noteCopy.categories) noteCopy.categories = [...noteCopy.categories]
              if (noteCopy.dueDate) noteCopy.dueDate = new Date(noteCopy.dueDate)
              if (noteCopy.startDate) noteCopy.startDate = new Date(noteCopy.startDate)
              if (noteCopy.endDate) noteCopy.endDate = new Date(noteCopy.endDate)
              this.notesOrigin.set(this.newNote, noteCopy)

              this.newNote = undefined
              this.isNotesChanged = true
            }

          }
        }),
        catchError((err: Error) => of({}))
      )

    }

    return of({})

  }

  deleteNote(note: Note | Task | EventNote) {

    return this.http.delete<Note | Task | EventNote>(`api/notes/${note.id}`).pipe(
      tap({
        complete: () => {

          this.isNotesChanged = true

        }
      }),
      catchError((err: Error) => of({}))
    )

  }

  // New note will have 'newNote' as its id
  createNewNote(type: 'note' | 'task' | 'event') {

    const tempNote: any = {
      id: 'new-note', // _id field of a mongodb document
      authorId: undefined,
      title: 'New note title (editable)',
      body: '',
      // importance?: 1 | 2 | 3 | 4,
      // categories?: string[],
      createdAt: new Date(),
    }

    switch (type) {
      case 'task':
        // tempNote.dueDate?: Date
        tempNote.status = 0
        break

      case 'event':
        tempNote.startDate = new Date()
        tempNote.endDate = new Date()
        break
    }

    this.newNote = tempNote

    return tempNote

  }

  convertNote(note: any, type: 'note' | 'task' | 'event') {

    if (!note) return

    switch (type) {

      case 'note':
        if ('dueDate' in note) delete note.dueDate
        if ('status' in note) delete note.status
        if ('startDate' in note) delete note.startDate
        if ('endDate' in note) delete note.endDate
        break

      case 'task':
        note.dueDate = new Date()
        note.status = 0
        if ('startDate' in note) delete note.startDate
        if ('endDate' in note) delete note.endDate
        break

      case 'event':
        note.startDate = new Date()
        note.endDate = new Date()
        if ('dueDate' in note) delete note.dueDate
        if ('status' in note) delete note.status
        break

    }

  }

  addNoteCategory(note: Note | Task | EventNote, category: string) {

    if (!category) return

    if (!note.categories)
      note.categories = [category]
    else if (!note.categories.includes(category))
      note.categories = [...note.categories, category]

  }

  deleteNoteCategory(note: Note | Task | EventNote, category: string) {

    if (note.categories)
      note.categories = note.categories.filter(noteCategory => noteCategory !== category)

  }

  changeNotePriority(note: Note | Task | EventNote, priority: undefined | 1 | 2 | 3 | 4) {

    if (!priority) {
      delete note.importance
      return
    }

    note.importance = priority

  }

  changeNoteStatus(note: Task, status: 0 | 1 | 2) {
    note.status = status
  }

  private transformDates(note: Note | Task | EventNote) {
    note.createdAt = new Date(note.createdAt)
    if (isEvent(note)) {
      note.startDate = new Date(note.startDate)
      note.endDate = new Date(note.endDate)
    }
    return note
  }

  private defineProxie(note: Note | Task | EventNote) {

    // TODO note is added to notesChanged on every change
    const noteHandler = {
      notesChanged: this.notesChanged,
      notesChangedProperties: this.notesChangedProperties,
      notesOrigin: this.notesOrigin,

      // TODO value is defined with any type
      set(obj: any, prop: any, value: any) {

        switch (prop) {

          case 'title':

            if (!this.notesOrigin.get(obj)?.['title'] && !value || this.notesOrigin.get(obj)?.['title'] === value)
              this.notesChangedProperties.get(obj)?.delete('title')
            else
              this.notesChangedProperties.get(obj)?.add('title')
            break

          case 'categories':

            if ((!this.notesOrigin.get(obj)?.['categories'] && !value.length) || ((this.notesOrigin.get(obj)?.['categories']?.length === value.length) && (this.notesOrigin.get(obj)?.['categories']?.every((category: any) => value.includes(category)))))
              this.notesChangedProperties.get(obj)?.delete('categories')
            else
              this.notesChangedProperties.get(obj)?.add('categories')
            break

          case 'createdAt':
          case 'dueDate':
          case 'startDate':
          case 'endDate':

            if (this.notesOrigin.get(obj)?.[prop]?.getTime() === value.getTime())
              this.notesChangedProperties.get(obj)?.delete(prop)
            else
              this.notesChangedProperties.get(obj)?.add(prop)
            break

          default:

            if (this.notesOrigin.get(obj)?.[prop] === value)
              this.notesChangedProperties.get(obj)?.delete(prop)
            else
              this.notesChangedProperties.get(obj)?.add(prop)
            break

        }

        if (this.notesChangedProperties.get(obj)?.size)
          this.notesChanged.add(obj)
        else
          this.notesChanged.delete(obj)

        obj[prop] = value

        return true
      },

      deleteProperty(obj: any, key: any) {

        if (!(key in this.notesOrigin.get(obj)))
          this.notesChangedProperties.get(obj)?.delete(key)
        else
          this.notesChangedProperties.get(obj)?.add(key)

        if (this.notesChangedProperties.get(obj)?.size)
          this.notesChanged.add(obj)
        else
          this.notesChanged.delete(obj)

        delete obj[key]

        return true

      }

    }

    const noteProxy = new Proxy<Note | Task | EventNote>(note, noteHandler)

    return noteProxy

  }

  private getOrganizedNotes(notes: Notes) {
    const notesOrganized: NotesOrganized = {
      notes: [],
      tasks: [],
      events: []
    }

    notes.forEach(note => {

      if (isTask(note)) notesOrganized.tasks.push(note)
      else if (isEvent(note)) notesOrganized.events.push(note)
      else notesOrganized.notes.push(note)

    })

    return notesOrganized
  }

}
