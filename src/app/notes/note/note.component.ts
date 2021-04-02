import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note, Task, Event as EventNote, isTask, isEvent } from 'src/app/types';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note | undefined
  @Input() isNoteTagsConstrained = true
  @Input() isNoteBodyConstrained = false

  importanceDetails = {
    1: { backgroundColor: '#ddd', text: 'Low' },
    2: { backgroundColor: '#bbb', text: 'Medium' },
    3: { backgroundColor: '#f55', text: 'High' },
    4: { backgroundColor: '#FC121C', text: 'Critical' },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
