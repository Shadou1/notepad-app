import { Component, OnInit } from '@angular/core'

import { NotesService } from '../notes/notes.service'

import { Notes, NotesOrganized } from '../types'

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Notes | undefined
  notesOrganized: NotesOrganized | undefined

  gettingNotes = false

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes() {

    this.gettingNotes = true

    this.notesService.getNotes().subscribe(notes => {

      this.gettingNotes = false

      this.notes = notes.notes
      this.notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

      this.notesOrganized = notes.notesOrganized
      Object.values(this.notesOrganized).forEach(notes => notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))

    })

  }

}
