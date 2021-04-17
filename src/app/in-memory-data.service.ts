import { Injectable } from '@angular/core'
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'

import { User, Note, Task, Event as EventNote } from './types'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(reqInfo?: RequestInfo): {} {

    const users: User[] = [
      {
        id: '123exampleId',
        nickname: 'Shadou'
      }
    ]

    const notes: Note[] = [
      {
        id: '984635494',
        authorId: '123exampleId',
        title: 'About kezo',
        body: 'I think kezo is up to no good',
        categories: ['Teeworlds', 'Failers'],
        createdAt: new Date(),
      },
      {
        id: '1612356141',
        authorId: '123exampleId',
        body: 'This note has no title',
        createdAt: new Date(),
      },
      {
        id: '5123512351235',
        authorId: '123exampleId',
        title: 'This note has a very long titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        body: '',
        createdAt: new Date(),
      },
      {
        id: '984615874',
        authorId: '123exampleId',
        title: 'About FapMan',
        body: 'FapMan is loosing points rapidly jalkdjflaskdjflkajsd lfkajsd flkjsadl;f kjasdl fkjasdl fjl',
        categories: ['FapMan', 'Points', 'Novice', 'Teeworlds', 'Failers'],
        createdAt: new Date(),
        importance: 1,
      },
      {
        id: '987467123',
        authorId: '123exampleId',
        title: 'About Gazmanov',
        body: 'He is a good person',
        createdAt: new Date(),
        categories: ['Teeworlds', 'Good people', 'Trustworthy', 'Never fails', 'Always saves', 'Газманов']
      },
      {
        id: '6846816',
        authorId: '666666zm102',
        title: 'About Shadou',
        body: 'Pidoras',
        categories: ['Teeworlds', 'Never fails'],
        createdAt: new Date(),
      },
      {
        id: '152351235',
        authorId: '123exampleId',
        title: 'About Igor',
        body: 'This note has an overwhelming amount of categories',
        importance: 3,
        categories: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa4'],
        createdAt: new Date(),
      },
      {
        id: '13512351',
        authorId: '123exampleId',
        title: 'Very long note',
        body: 'God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me. God out pastor I will not be needing anything. He rests me in golden fields and leads me to the calm waters. He resusitates me.',
        createdAt: new Date(),
      },
    ]

    notes[0].createdAt.setDate(notes[0].createdAt.getDate() - 14)
    notes[1].createdAt.setHours(0)

    const tasks: Task[] = [
      {
        id: '11351251',
        authorId: '123exampleId',
        title: 'Clean certain face',
        body: 'Certain face is in desperate need of cleaning',
        createdAt: new Date(),
        categories: ['kezo', 'Teeworlds', 'Failers', 'Hookers'],
        status: 2,
        importance: 3,
      },
      {
        id: '13151',
        authorId: '123exampleId',
        title: 'Kill',
        body: 'Mapmaker is no more',
        categories: ['Mapmaker', 'DDMax'],
        createdAt: new Date(),
        status: 1,
        importance: 4,
      },
      {
        id: '1426123',
        authorId: '123exampleId',
        title: 'Find who is responsive',
        body: 'Who is responsible for this shit?',
        createdAt: new Date(),
        dueDate: new Date(),
        status: 0,
        importance: 1
      },
    ]

    const events: EventNote[] = [
      {
        id: '81948964',
        authorId: '123exampleId',
        title: 'Earn points',
        body: 'Spend a little bit earning points',
        createdAt: new Date(),
        startDate: new Date(Math.random() * 15552000000 + 1609394035799),
        endDate: new Date(Math.random() * 15552000000 + 1609394035799 + 15552000000),
      },
      {
        id: '513251235',
        authorId: '123exampleId',
        title: 'Search for kezo',
        body: 'kezo is lost',
        createdAt: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        importance: 2,
      },
      {
        id: '6456819',
        authorId: '123exampleId',
        title: 'Execute Corneum',
        body: 'He made his last map',
        createdAt: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        importance: 2,
      },
    ]

    events[1].startDate.setHours(48)
    events[1].endDate.setHours(49)

    events[2].startDate.setHours(24)
    events[2].endDate.setHours(25)

    return {
      users,
      notes: [...notes, ...tasks, ...events],
    }

  }

  genId(items: Array<any>) {
    return Math.floor(Math.random() * 7.884e+9 + 1609394035799).toString()
  }

}
