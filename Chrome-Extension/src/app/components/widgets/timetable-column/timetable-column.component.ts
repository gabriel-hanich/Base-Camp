import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
import { Period, widget } from 'src/models';

@Component({
  selector: 'app-timetable-column',
  templateUrl: './timetable-column.component.html',
  styleUrls: ['./timetable-column.component.scss']
})
export class TimetableColumnComponent implements OnInit {
  @Input() toggleEmitter: EventEmitter<String>;
  @Input() currentDate: String;

  public timetableData: Period[] = [];
  public isCurrentWeek: boolean = false; // If the week being displayed is the same as the current week
  
  public titleText: String;

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    this.getTimetableData();
  }


  getTimetableData():void{
    this.titleText = "";
    this.timetableData = [];

    var displayDate = new Date();

    let week1Data: Array<Period[]> = JSON.parse(this.globalVars.getVar("wk1Data"));
    let week2Data: Array<Period[]> = JSON.parse(this.globalVars.getVar("wk2Data"));
    let displayWeek = this.globalVars.getVar("weekLetter");
    let wk1IsWkA: boolean = JSON.parse(this.globalVars.getVar("wk1IsWkA"));

    let dayList = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

    if(this.currentDate === "today"){
      this.isCurrentWeek = true;
      this.titleText = "Today" 
    }
    else if(this.currentDate === "tomorrow"){
<<<<<<< Updated upstream
      displayDate.setDate(displayDate.getDate() + 1);
      this.isCurrentWeek = true;
      this.titleText = "Tomorrow"
=======
      // Show mondays timetable as 'tomorrows' on Friday and Saturday
      if(displayDate.getDay() == 5 || displayDate.getDay() == 6){
        displayDate.setDate(displayDate.getDate() + (8 - displayDate.getDay()))
        console.log(displayDate.getDay() - 7)
        this.titleText = "Monday next Week"
        if(displayWeek == "A"){ // Invert the week as it is monday of NEXT week
          displayWeek = "B"
        }else{
          displayWeek = "A"
        }
      }else{
        displayDate.setDate(displayDate.getDate() + 1);
        this.titleText = "Tomorrow"
      }
      this.isCurrentWeek = true;

>>>>>>> Stashed changes
    }else if(this.currentDate[this.currentDate.length - 1] === "A"){
      displayWeek = "a";
      for(var i=0; i<7; i++){
        displayDate.setDate(displayDate.getDate() + 1);
        if(this.currentDate.includes(dayList[displayDate.getDay()])){
          break;
        }
      }
    }

    if((wk1IsWkA && displayWeek == "a") || (!wk1IsWkA && displayWeek == "b")){ // If the data to be shown comes from week 1
      for(var i=0; i<week1Data.length; i++){
        if(new Date(week1Data[i][0].startDate).getDay() == displayDate.getDay()){
          this.timetableData = week1Data[i];
        }
      }
    }else{ // If the data do be displayed is from week 2
      for(var i=0; i<week2Data.length; i++){
        if(new Date(week2Data[i][0].startDate).getDay() == displayDate.getDay()){
          this.timetableData = week2Data[i];
        }
      }
    }


    // Convert each start and end time from string to date
    for(var i=0; i<this.timetableData.length; i++){
      this.timetableData[i].startDate = new Date(this.timetableData[i].startDate);
      this.timetableData[i].endDate = new Date(this.timetableData[i].endDate);
    }
    
      
  }
}
