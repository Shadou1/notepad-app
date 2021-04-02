import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { Note, Task, Event as EventNote, Notes, isEvent, NotesOrganized, isTask } from '../types'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Notes | undefined
  notesOrganized: NotesOrganized | undefined

  constructor(
    private http: HttpClient,
  ) { }

  // TODO remove ?authorId=userId when backend is implemented
  getNotes(userId: string='s777777102', changed=false): Observable<{notes: Notes, notesOrganized: NotesOrganized}> {

    if (!changed && this.notes && this.notesOrganized) return of({ notes: this.notes, notesOrganized: this.notesOrganized })

    return this.http.get<Notes>(`api/notes/?authorId=${userId}`).pipe(
      // map(notes => notes.filter(note => note.authorId === userId)),

      map(notes => {
        notes.forEach(note => this.transformDates(note))
        this.notes = notes
        this.notesOrganized = this.getOrganizedNotes(notes)
        return { notes: this.notes, notesOrganized: this.notesOrganized }
      }),

      catchError((err: Error) => of({ notes: [], notesOrganized: { notes: [], tasks: [], events: [] } }))

    )
  }

  // Tuple version (does not work)
  // getNotes2(userId: string, changed=false): Observable<[Notes, NotesOrganized]> {

  //   if (!changed && this.notes && this.notesOrganized) return of([this.notes, this.notesOrganized])

  //   return this.http.get<Notes>(`api/notes/?authorId=${userId}`).pipe(
  //     // map(notes => notes.filter(note => note.authorId === userId)),

  //     map(notes => {
  //       notes.forEach(note => this.transformDates(note))
  //       this.notes = notes
  //       this.notesOrganized = this.getOrganizedNotes(notes)
  //       // 'as' keyword should not be necessary but it fails without it
  //       return [this.notes, this.notesOrganized]
  //       // return [this.notes, this.notesOrganized] as [Notes, NotesOrganized]
  //     }),

  //     // 'as' keyword should not be necessary but it fails without it
  //     catchError((err: Error) => of([[], {notes: [], tasks: [], events: []}]))
  //     // catchError((err: Error) => of([[], {notes: [], tasks: [], events: []}] as [Notes, NotesOrganized]))

  //   )
  // }

  getNote(noteId: string, changed=false): Observable<Note | Task | EventNote | undefined> {
    if (!changed && this.notes) return of(this.notes.find(note => note.id === noteId))

    return this.http.get<Note | Task | EventNote | undefined>(`api/notes/${noteId}`).pipe(
      map(note => this.transformDates(note!)),
      catchError((err: Error) => of(undefined))
    )
  }

  private transformDates(note: Note | Task | EventNote) {
    note.createdAt = new Date(note.createdAt)
    if (isEvent(note)) {
      note.startDate = new Date(note.startDate)
      note.endDate = new Date(note.endDate)
    }
    return note
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

  // getTasks(userId: string): Observable<Task[]> {
  //   return this.http.get<Task[]>(`api/tasks/?authorId=${userId}`).pipe(
  //     map(notes => notes.map(note => {
  //       note.createdAt = new Date(note.createdAt)
  //       return note
  //     })),
  //     catchError((err: Error) => of([]))
  //   )
  // }

  // getEvents(userId: string): Observable<EventNote[]> {
  //   return this.http.get<EventNote[]>(`api/events/?authorId=${userId}`).pipe(
  //     map(notes => notes.map(note => {
  //       note.createdAt = new Date(note.createdAt)
  //       note.startDate = new Date(note.startDate)
  //       note.endDate = new Date(note.endDate)
  //       return note
  //     })),
  //     catchError((err: Error) => of([]))
  //   )
  // }

  // TODO rewrite getAllNotes to get AllNotes from a single route when backend is implemented

  // getAllNotes(userId: string): Observable<Notes> {

  //   return new Observable<Notes>(subscriber => {

  //     let notes: Note[], tasks: Task[], events: EventNote[]
  //     this.getNotes(userId).toPromise().then(notes1 => {
  //       notes = notes1
  //       this.getTasks(userId).toPromise().then(tasks1 => {
  //         tasks = tasks1
  //         this.getEvents(userId).toPromise().then(events1 => {
  //           events = events1
  //           subscriber.next({ notes, tasks, events })
  //         })
  //       })
  //     })
  //   })

  // }

}
