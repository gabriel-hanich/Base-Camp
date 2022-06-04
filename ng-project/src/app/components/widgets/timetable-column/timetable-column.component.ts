import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable-column',
  templateUrl: './timetable-column.component.html',
  styleUrls: ['./timetable-column.component.scss']
})
export class TimetableColumnComponent implements OnInit {
  @Input() displaySettings: boolean;
  @Input() id: number;

  public currentDate = "today";

  constructor() { }

  ngOnInit(): void {
  }


}
