import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudyNoteComponent } from './new-study-note.component';

describe('NewStudyNoteComponent', () => {
  let component: NewStudyNoteComponent;
  let fixture: ComponentFixture<NewStudyNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStudyNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
