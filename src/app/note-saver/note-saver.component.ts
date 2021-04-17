import { Component, OnInit } from '@angular/core'
import { NotesService } from '../notes/notes.service'

@Component({
  selector: 'app-note-saver',
  templateUrl: './note-saver.component.html',
  styleUrls: ['./note-saver.component.css']
})
export class NoteSaverComponent implements OnInit {

  constructor(
    public notesService: NotesService,
  ) { }

  isSaving = false
  // notesChanged = this.notesService.notesChanged
  // newNote = this.notesService.newNote

  ngOnInit(): void {
  }

  saveNotes() {
    if (!this.isSaving && (this.notesService.notesChanged.size || this.notesService.newNote)) {
      this.isSaving = true

      if (this.notesService.notesChanged.size) {
        this.notesService.putNotes().forEach(putRequest => putRequest.subscribe({
          next: () => this.isSaving = true,
          complete: () => this.isSaving = false,
        }))
      }

      if (this.notesService.newNote) {
        this.notesService.postNewNote().subscribe({
          next: () => this.isSaving = true,
          complete: () => this.isSaving = false,
        })
      }
    }
  }

}
