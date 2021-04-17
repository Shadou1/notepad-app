import { Component, Input, OnInit } from '@angular/core'
import { Event as EventNote } from 'src/app/types'
import { NotesService } from '../notes.service'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() note: EventNote | undefined
  @Input() isNoteEditable = false
  @Input() isNoteTagsConstrained = true
  @Input() isNoteBodyConstrained = false
  eventDetails: { backgroundColor: string, text: string } | undefined

  isAddCategoryCollapsed = true

  importanceDetails = {
    1: { backgroundColor: '#ddd', text: 'Low' },
    2: { backgroundColor: '#bbb', text: 'Medium' },
    3: { backgroundColor: '#f55', text: 'High' },
    4: { backgroundColor: '#FC121C', text: 'Critical' },
  }

  eventStatusDetails = {
    0: { backgroundColor: '#ddd', text: 'This week' },
    1: { backgroundColor: '#bbb', text: 'Today' },
    2: { backgroundColor: '#f55', text: 'Right now!' },
  }

  getEventTime(note: EventNote) {
    const currentTime = new Date().getTime()
    const timeToEvent = note.startDate.getTime() - currentTime

    if (timeToEvent > 0) {
      if (timeToEvent < 86400000)
        return this.eventStatusDetails[1]
      else if (timeToEvent < 604800000)
        return this.eventStatusDetails[0]
    } else if (currentTime < note.endDate.getTime())
      return this.eventStatusDetails[2]

    return undefined
  }

  constructor(
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    if (this.note) this.eventDetails = this.getEventTime(this.note)
  }

  addCategory(category: string) {
    if (this.note) this.notesService.addNoteCategory(this.note, category)
  }

  deleteCategory(category: string) {
    if (this.note) this.notesService.deleteNoteCategory(this.note, category)
  }

}
