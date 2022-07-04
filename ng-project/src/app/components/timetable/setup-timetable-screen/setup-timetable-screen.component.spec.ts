import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTimetableScreenComponent } from './setup-timetable-screen.component';

describe('SetupTimetableScreenComponent', () => {
  let component: SetupTimetableScreenComponent;
  let fixture: ComponentFixture<SetupTimetableScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTimetableScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTimetableScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
