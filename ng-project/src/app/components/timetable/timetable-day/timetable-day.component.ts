import { Component, Input, OnInit } from '@angular/core';
import { Period } from 'src/models';

@Component({
  selector: 'app-timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.scss']
})
export class TimetableDayComponent implements OnInit {
  @Input() timetableData: Period[]; 
  public dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  public dayName: string; 

  constructor() { }

  ngOnInit(): void {
  }

}
