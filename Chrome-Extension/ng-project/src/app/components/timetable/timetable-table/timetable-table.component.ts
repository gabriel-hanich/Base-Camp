import { Component, EventEmitter, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
import { Period } from 'src/models';

@Component({
  selector: 'app-timetable-table',
  templateUrl: './timetable-table.component.html',
  styleUrls: ['./timetable-table.component.scss']
})
export class TimetableTableComponent implements OnInit {
  private dayList: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  public currentDay: string = this.dayList[new Date().getDay()];
  public currentWeek: string = this.globalVars.getVar("weekLetter").toUpperCase();

  public weekAData: Array<Period[]> = [];
  public weekBData: Array<Period[]> = [];

  public displayData: Period[] = [];
  private displayDay: String = 'monday';
  private displayWeek: String = 'a';

  public hasTimetableData: boolean = false;

  public timeEmitter: EventEmitter<String> = new EventEmitter<String>();

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    // Capitalise currentDay
    this.currentDay = this.currentDay.charAt(0).toUpperCase() + this.currentDay.slice(1);

    document.getElementById("sideBar")?.classList.add("sidebar-retracted");

    // Get the timetable data
    // Determine whether wk1 is A or B
    if(this.globalVars.getVar("wk1Data") != "[]"){
      if(this.globalVars.getVar("wk1IsWkA") == "true"){
        this.weekAData = JSON.parse(this.globalVars.getVar("wk1Data"));
        this.weekBData = JSON.parse(this.globalVars.getVar("wk2Data"));
      }else{
        this.weekAData = JSON.parse(this.globalVars.getVar("wk2Data"));
        this.weekBData = JSON.parse(this.globalVars.getVar("wk1Data"));
      }
      this.hasTimetableData = true
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
    this.updateDisplayData();
  }

  setDisplayDay(day: string): void{
    this.displayDay = day;
    this.updateDisplayData();
  }

  setDisplayWeek(week: string): void{
    this.displayWeek = week;
    this.updateDisplayData();
  }

  updateDisplayData():void{
    let wkData: Period[][];
    if(this.displayWeek == 'a'){
      wkData = this.weekAData;
      this.displayData = this.weekAData[this.dayList.indexOf(this.displayDay as string) - 1];
    }else{
      wkData = this.weekBData;
      this.displayData = this.weekBData[this.dayList.indexOf(this.displayDay as string) - 1];
    }
    for(var i=0; i<wkData.length; i++){
      if(this.dayList[wkData[i][0].startDate.getDay()] == this.displayDay){
        this.displayData = wkData[i]
      }
    }
  }
  
  showTimes():void{
    this.timeEmitter.emit("WOOO");
  }

}