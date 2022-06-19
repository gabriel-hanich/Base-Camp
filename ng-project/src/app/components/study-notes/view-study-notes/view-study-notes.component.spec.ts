import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudyNotesComponent } from './view-study-notes.component';

describe('ViewStudyNotesComponent', () => {
  let component: ViewStudyNotesComponent;
  let fixture: ComponentFixture<ViewStudyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudyNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
