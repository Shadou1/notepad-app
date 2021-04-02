import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotesService } from '../notes/notes.service';

import { Note, Task, Event as EventNote } from '../types';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  note: Note | Task | EventNote | undefined

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id')
    if (noteId) this.getNote(noteId)
  }

  getNote(noteId: string) {
    this.notesService.getNote(noteId).subscribe(note => {
      this.note = note
    })
  }

}
