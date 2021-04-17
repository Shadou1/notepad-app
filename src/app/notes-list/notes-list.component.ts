import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { NotesService } from '../notes/notes.service'

import { Notes, NotesOrganized } from '../types'

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Notes | undefined
  notesOrganized: NotesOrganized | undefined
  notesFiltered: NotesOrganized | undefined

  notesCategories: Array<string> = []

  filterType = new FormControl('')
  filterCategory = new FormControl('')
  filterImportance = new FormControl('')
  filterTitle = new FormControl('')
  filterText = new FormControl('')
  filterDate = new FormControl('')

  isGettingNotes = false

  private formSubject = new Subject<any>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    this.filterType.valueChanges.subscribe(value => this.formSubject.next(value))
    this.filterCategory.valueChanges.subscribe(value => this.formSubject.next(value))
    this.filterImportance.valueChanges.subscribe(value => this.formSubject.next(value))
    this.filterTitle.valueChanges.subscribe(value => this.formSubject.next(value))
    this.filterText.valueChanges.subscribe(value => this.formSubject.next(value))
    this.filterDate.valueChanges.subscribe(value => this.formSubject.next(value))

    this.formSubject.pipe(
      debounceTime(10),
    ).subscribe(value => this.filterNotes())

    this.route.queryParamMap.subscribe(queryParams => this.updateFiltersWithRoute(queryParams))

    this.getNotes()

    // Uninitialize new note when navigating to notes-list
    this.notesService.newNote = undefined
  }

  getNotes() {

    this.isGettingNotes = true

    this.notesService.getNotes().subscribe(notes => {

      this.isGettingNotes = false

      this.notes = notes.notes
      this.notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

      this.notesOrganized = notes.notesOrganized
      Object.values(this.notesOrganized).forEach(notes => notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))

      this.notesCategories = Array.from(this.notes.reduce((categories, note) => {

        if (note.categories) note.categories.forEach(category => categories.add(category))
        return categories

      }, new Set<string>()))

      this.filterNotes()

    })

  }

  updateFiltersWithRoute(queryParams: ParamMap) {

    const typeQuery = queryParams.get('type')
    if (typeQuery) this.filterType.setValue(typeQuery)

    const categoryQuery = queryParams.get('category')
    if (categoryQuery) this.filterCategory.setValue(categoryQuery)

    const importanceQuery = queryParams.get('importance')
    if (importanceQuery) this.filterImportance.setValue(importanceQuery)

    const titleQuery = queryParams.get('title')
    if (titleQuery) this.filterTitle.setValue(titleQuery)

    const textQuery = queryParams.get('text')
    if (textQuery) this.filterText.setValue(textQuery)

    const dateQuery = queryParams.get('date')
    if (dateQuery) this.filterDate.setValue(dateQuery)

  }

  // TODO only changed filter should update this.notesFiltered
  filterNotes() {

    if (this.notesOrganized) {

      const queryParams: any = {}

      this.notesFiltered = {
        notes: [...this.notesOrganized.notes],
        tasks: [...this.notesOrganized.tasks],
        events: [...this.notesOrganized.events],
      }

      if (this.filterType.value) {

        switch (this.filterType.value) {
          case 'notes':
            this.notesFiltered.tasks = []
            this.notesFiltered.events = []
            break
          case 'tasks':
            this.notesFiltered.notes = []
            this.notesFiltered.events = []
            break
          case 'events':
            this.notesFiltered.notes = []
            this.notesFiltered.tasks = []
            break
        }

        queryParams['type'] = this.filterType.value

      }

      // TODO rewrite each of the following as loops

      if (this.filterCategory.value) {
        this.notesFiltered.notes = this.notesFiltered.notes.filter(note => note.categories && note.categories.includes(this.filterCategory.value))
        this.notesFiltered.tasks = this.notesFiltered.tasks.filter(note => note.categories && note.categories.includes(this.filterCategory.value))
        this.notesFiltered.events = this.notesFiltered.events.filter(note => note.categories && note.categories.includes(this.filterCategory.value))

        queryParams['category'] = this.filterCategory.value
      }

      if (this.filterImportance.value) {
        this.notesFiltered.notes = this.notesFiltered.notes.filter(note => note.importance && note.importance == this.filterImportance.value)
        this.notesFiltered.tasks = this.notesFiltered.tasks.filter(note => note.importance && note.importance == this.filterImportance.value)
        this.notesFiltered.events = this.notesFiltered.events.filter(note => note.importance && note.importance == this.filterImportance.value)

        queryParams['importance'] = this.filterImportance.value
      }

      if (this.filterTitle.value) {
        const filterReg = new RegExp(this.filterTitle.value, 'i')

        this.notesFiltered.notes = this.notesFiltered.notes.filter(note => note.title && filterReg.test(note.title))
        this.notesFiltered.tasks = this.notesFiltered.tasks.filter(note => note.title && filterReg.test(note.title))
        this.notesFiltered.events = this.notesFiltered.events.filter(note => note.title && filterReg.test(note.title))

        queryParams['title'] = this.filterTitle.value
      }

      if (this.filterText.value) {
        const filterReg = new RegExp(this.filterText.value, 'i')

        this.notesFiltered.notes = this.notesFiltered.notes.filter(note => filterReg.test(note.body))
        this.notesFiltered.tasks = this.notesFiltered.tasks.filter(note => filterReg.test(note.body))
        this.notesFiltered.events = this.notesFiltered.events.filter(note => filterReg.test(note.body))

        queryParams['text'] = this.filterText.value
      }

      // TODO date filter is incorrect
      if (this.filterDate.value) {
        const todayDate = new Date(this.filterDate.value)

        this.notesFiltered.notes = this.notesFiltered.notes.filter(note => note.createdAt > todayDate)
        this.notesFiltered.tasks = this.notesFiltered.tasks.filter(note => note.createdAt > todayDate)
        this.notesFiltered.events = this.notesFiltered.events.filter(note => note.createdAt > todayDate)

        queryParams['date'] = this.filterDate.value
      }

      this.router.navigate(['/notes'], { queryParams })

    }

  }

}
