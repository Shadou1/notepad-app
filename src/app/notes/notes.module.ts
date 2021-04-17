import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from '../app-routing.module'
import { FormsModule } from '@angular/forms'

import { NoteComponent } from './note/note.component'
import { TaskComponent } from './task/task.component'
import { EventComponent } from './event/event.component'
import { NoteRootComponent } from './note-root/note-root.component'

@NgModule({
  declarations: [
    NoteComponent,
    TaskComponent,
    EventComponent,
    NoteRootComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [
    NoteComponent,
    TaskComponent,
    EventComponent,
    NoteRootComponent,
  ]
})
export class NotesModule { }
