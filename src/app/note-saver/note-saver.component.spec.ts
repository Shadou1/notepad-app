import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSaverComponent } from './note-saver.component';

describe('NoteSaverComponent', () => {
  let component: NoteSaverComponent;
  let fixture: ComponentFixture<NoteSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteSaverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
