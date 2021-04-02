import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteRootComponent } from './note-root.component';

describe('NoteRootComponent', () => {
  let component: NoteRootComponent;
  let fixture: ComponentFixture<NoteRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
