import { Component, Input, OnInit } from '@angular/core'
import { Note } from 'src/app/types'
import { NotesService } from '../notes.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note | undefined
  @Input() isNoteEditable = false
  @Input() isNoteTagsConstrained = true
  @Input() isNoteBodyConstrained = false

  isAddCategoryCollapsed = true

  importanceDetails = {
    1: { backgroundColor: '#ddd', text: 'Low' },
    2: { backgroundColor: '#bbb', text: 'Medium' },
    3: { backgroundColor: '#f55', text: 'High' },
    4: { backgroundColor: '#FC121C', text: 'Critical' },
  }

  constructor(
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
  }

  addCategory(category: string) {
    if (this.note) this.notesService.addNoteCategory(this.note, category)
  }

  deleteCategory(category: string) {
    if (this.note) this.notesService.deleteNoteCategory(this.note, category)
  }

}
