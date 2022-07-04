import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyNotesPageComponent } from './study-notes-page.component';

describe('StudyNotesPageComponent', () => {
  let component: StudyNotesPageComponent;
  let fixture: ComponentFixture<StudyNotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyNotesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
