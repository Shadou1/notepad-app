import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { NotesService } from '../notes/notes.service'

import { Note, Task, Event as EventNote, getNoteType } from '../types'

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  note: Note | Task | EventNote | undefined

  noteType = new FormControl('')
  notePriority = new FormControl('')

  isGettingNote = true
  isDeleting = false

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const noteId = params.get('id')
      if (noteId) this.getNote(noteId)
    })
  }

  getNote(noteId: string) {
    this.isGettingNote = true

    this.notesService.getNote(noteId).subscribe(note => {
      this.isGettingNote = false
      this.note = note
      if (this.note) {
        this.noteType.setValue(getNoteType(note!))
        this.notePriority.setValue(note?.importance)

        this.noteType.valueChanges.subscribe(noteType => this.notesService.convertNote(this.note, noteType))
        this.notePriority.valueChanges.subscribe(notePriority => {if (this.note) this.notesService.changeNotePriority(this.note, +notePriority as 1 | 2 | 3 | 4)})

      }
      // this.note?.categories?.push?.('zalupa')
    })
  }

  deleteNote() {

    if (this.note) {

      this.isDeleting = true

      this.notesService.deleteNote(this.note).subscribe({
        next: () => this.isDeleting = true,
        complete: () => {
          this.isDeleting = false
          this.note = undefined
        },
      })

    }

  }

}
