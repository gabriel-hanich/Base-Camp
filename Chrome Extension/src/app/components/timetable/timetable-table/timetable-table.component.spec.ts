import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableTableComponent } from './timetable-table.component';

describe('TimetableTableComponent', () => {
  let component: TimetableTableComponent;
  let fixture: ComponentFixture<TimetableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
