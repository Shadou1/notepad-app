import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'
import { NoteDetailsComponent } from './note-details/note-details.component'
import { NotesListComponent } from './notes-list/notes-list.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'note/:id', component: NoteDetailsComponent },
  { path: 'notes', component: NotesListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
