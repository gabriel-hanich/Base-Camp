import { Component, Input, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Period, widget } from 'src/models';

@Component({
  selector: 'app-timetable-column',
  templateUrl: './timetable-column.component.html',
  styleUrls: ['./timetable-column.component.scss']
})
export class TimetableColumnComponent implements OnInit {
  @Input() displaySettings: boolean;
  @Input() id: number;

  public currentDate = "today";
  public timetableData: Period[] = [];
  public isCurrentWeek: boolean = false; // If the week being displayed is the same as the current week
  private widgetData: widget; // The Widget obj
  private widgetIndex: number;  // The index of the widget obj in the array
  
  public titleText: String;

  private additionalData: Map<String, String>;

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    let totalWidgetData: widget[] = JSON.parse(this.globalVars.getVar("widgetsLayout"));
    for(var i=0; i<totalWidgetData.length; i++){
      if(totalWidgetData[i].id == this.id){
        this.widgetData = totalWidgetData[i];
        this.widgetIndex = i;
      }
    }
    if(this.widgetData.additionalData){
      this.additionalData = new Map<String, String>(JSON.parse(this.widgetData.additionalData as string));
      this.currentDate = this.additionalData.get("date") as string;
    }else{
      this.additionalData = new Map<String, String>();
      this.updateGlobalScope();
    }
    
    if(!this.currentDate){
      this.currentDate = "today";
    }
    this.getTimetableData();

  }
  updateGlobalScope():void{
    let totalWidgetData: widget[] = JSON.parse(this.globalVars.getVar("widgetsLayout"));
    this.widgetData.additionalData = JSON.stringify(Array.from(this.additionalData.entries()));
    console.log(this.widgetData.additionalData)
    totalWidgetData[this.widgetIndex] = this.widgetData;

    this.globalVars.setVar("widgetsLayout", JSON.stringify(totalWidgetData));
  }
  
  updateDate():void{
    this.additionalData.set("date", this.currentDate);
    this.updateGlobalScope();
    this.getTimetableData();
  }


  getTimetableData():void{
    this.titleText = "";
    this.timetableData = [];

    let displayDate = new Date();

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
      displayDate.setDate(displayDate.getDate() + 1);
      this.isCurrentWeek = true;
      this.titleText = "Tomorrow"
    }else if(this.currentDate[this.currentDate.length - 1] === "A"){
      displayWeek = "a";
      for(var i=0; i<7; i++){
        displayDate.setDate(displayDate.getDate() + 1);
        if(this.currentDate.includes(dayList[displayDate.getDay()])){
          break;
        }
      }
    }else if(this.currentDate[this.currentDate.length - 1] === "B"){
      displayWeek = "b";
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
