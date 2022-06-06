import { Component, Input, OnInit } from '@angular/core';
import { Period } from 'src/models';

@Component({
  selector: 'app-timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.scss']
})
export class TimetableDayComponent implements OnInit {
  @Input() timetableData: Period[]; 
  @Input() isCurrentWeek: boolean;
  @Input() titleText: String;
  public dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  public dayName: string; 
  public isToday: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
    let today = new Date();
    for(var i=0; i<this.timetableData.length; i++){
      this.timetableData[i]["classname"] = this.timetableData[i]["classname"].split(":")[1];
      if(this.isCurrentWeek && this.timetableData[i].startDate.getDay() == today.getDay()){ // If the period is in the correct week (A or B) AND the same day as today
        this.isToday = true;

        let startTime = new Date(today.getTime());
        startTime.setMinutes(this.timetableData[i]["startDate"].getMinutes());
        startTime.setHours(this.timetableData[i]["startDate"].getHours());
        
        let endTime = new Date(today.getTime());
        endTime.setMinutes(this.timetableData[i]["endDate"].getMinutes());
        endTime.setHours(this.timetableData[i]["endDate"].getHours());
        console.log([startTime, today, endTime])
        if(startTime < today && endTime > today){
          console.log("WOOO")
          this.timetableData[i]['isCurrent'] = true;
        }

      }
    }
  }

}
