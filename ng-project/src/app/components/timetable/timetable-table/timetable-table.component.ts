import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Period } from 'src/models';

@Component({
  selector: 'app-timetable-table',
  templateUrl: './timetable-table.component.html',
  styleUrls: ['./timetable-table.component.scss']
})
export class TimetableTableComponent implements OnInit {
  public currentDay: string = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
  public currentWeek: string = this.globalVars.getVar("weekLetter").toUpperCase();

  public weekAData: Array<Period[]> = [];
  public weekBData: Array<Period[]> = [];

  public isWeekA = this.currentWeek == "A";
  public isWeekB = this.currentWeek == "B";

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    // Get the timetable data
    console.log(this.currentWeek);
    // Determine whether wk1 is A or B
    if(this.globalVars.getVar("wk1IsWkA") == "true"){
      this.weekAData = JSON.parse(this.globalVars.getVar("wk1Data"));
      this.weekBData = JSON.parse(this.globalVars.getVar("wk2Data"));
    }else{
      this.weekAData = JSON.parse(this.globalVars.getVar("wk2Data"));
      this.weekBData = JSON.parse(this.globalVars.getVar("wk1Data"));
    }

    for(var i=0; i<this.weekAData.length; i++){
      for(var k=0; k<this.weekAData[i].length; k++){
        this.weekAData[i][k]["startDate"] = new Date(this.weekAData[i][k]["startDate"]);
        this.weekAData[i][k]["endDate"] = new Date(this.weekAData[i][k]["endDate"]);
      }
    }
    for(var i=0; i<this.weekBData.length; i++){
      for(var k=0; k<this.weekBData[i].length; k++){
        this.weekBData[i][k]["startDate"] = new Date(this.weekBData[i][k]["startDate"]);
        this.weekBData[i][k]["endDate"] = new Date(this.weekBData[i][k]["endDate"]);
      }
    }
  }

}
