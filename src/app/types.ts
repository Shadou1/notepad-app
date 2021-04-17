
// Note types

export interface Note {
  id: string, // _id field of a mongodb document
  authorId: string,
  title?: string,
  body: string,
  importance?: 1 | 2 | 3 | 4,
  categories?: string[],
  createdAt: Date,
}

export interface Task extends Note {
  dueDate?: Date,
  status: 0 | 1 | 2,
}

export interface Event extends Note {
  startDate: Date,
  endDate: Date,
}

export type Notes = (Note | Task | Event)[]
export type NotesOrganized = {
  notes: Note[],
  tasks: Task[],
  events: Event[],
}

// User

export interface User {
  id: string,
  nickname: string,
}

// Type guards

export function isTask(note: Note | Task | Event): note is Task {
  return (note as Task).status !== undefined
}

export function isEvent(note: Note | Task | Event): note is Event {
  return (note as Event).startDate !== undefined
}

// Type utils

export function getNoteType(note : Note | Task | Event) {

  if (isTask(note)) return 'task'
  else if (isEvent(note)) return 'event'
  else return 'note'

}
