import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './in-memory-data.service'

import { NotesModule } from './notes/notes.module'

import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { NoteDetailsComponent } from './note-details/note-details.component'
import { NotesListComponent } from './notes-list/notes-list.component'
import { NoteSaverComponent } from './note-saver/note-saver.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NoteDetailsComponent,
    NotesListComponent,
    NoteSaverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NotesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
