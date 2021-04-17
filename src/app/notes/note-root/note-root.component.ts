import { Component, Input, OnInit } from '@angular/core'
import { Note, Task, Event as EventNote, isTask, isEvent } from 'src/app/types'

@Component({
  selector: 'app-note-root',
  templateUrl: './note-root.component.html',
  styleUrls: ['./note-root.component.css']
})
export class NoteRootComponent implements OnInit {

  @Input() note: Note | Task | EventNote | undefined
  @Input() isNoteEditable = false
  @Input() isNoteTagsConstrained = true
  @Input() isNoteBodyConstrained = false

  constructor() { }

  ngOnInit(): void {
  }

  isTask = isTask
  isEvent = isEvent

}
