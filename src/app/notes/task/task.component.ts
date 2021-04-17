import { Component, Input, OnInit } from '@angular/core'
import { Task } from 'src/app/types'
import { NotesService } from '../notes.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() note: Task | undefined
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

  taskStatusDetails = {
    0: { text: '' },
    1: { text: '✔️' },
    2: { text: '❌' }
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

  onTaskButtonClick(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.note) this.notesService.changeNoteStatus(this.note, ((this.note.status + 1) % 3) as 0 | 1 | 2)
  }

}
