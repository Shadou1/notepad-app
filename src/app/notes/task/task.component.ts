import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() note: Task | undefined
  @Input() isNoteTagsConstrained = true
  @Input() isNoteBodyConstrained = false

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

  onTaskButtonClick(event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
