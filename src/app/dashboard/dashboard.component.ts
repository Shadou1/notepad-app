import { Component, OnInit } from '@angular/core'

import { NotesService } from '../notes/notes.service'

import { Notes } from '../types'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notes: Notes | undefined
  notesRelevant: Notes | undefined
  notesWeek: Notes | undefined
  notesMonth: Notes | undefined

  isGettingNotes = false

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.getNotes()
    // Uninitialize new note when navigating to dashboard
    this.notesService.newNote = undefined
  }

  getNotes() {

    this.isGettingNotes = true

    this.notesService.getNotes().subscribe(notes => {

      this.isGettingNotes = false

      this.notes = notes.notes
      this.notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

      this.notesRelevant = this.notes.slice(0, 6)
      const notRelevantNotes = this.notes.slice(6)


      const timeNow = new Date().getTime()

      this.notesWeek = notRelevantNotes.filter(note => timeNow - note.createdAt.getTime() < 604800000 && timeNow - note.createdAt.getTime() > 0)
      this.notesMonth = notRelevantNotes.filter(note => timeNow - note.createdAt.getTime() < 2592000000 && timeNow - note.createdAt.getTime() > 604800000)

    })

  }

}
