import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Period } from "src/models"

@Component({
  selector: 'app-setup-timetable-screen',
  templateUrl: './setup-timetable-screen.component.html',
  styleUrls: ['./setup-timetable-screen.component.scss']
})
export class SetupTimetableScreenComponent implements OnInit {
  public calibrationData: Period[] = [];
  public defaultCalibrationOption: "label1" | "label2" | "none"; 
  public currentWeekOption: "label1" | "label2" | "none"; 
  public currentWeek: number;

  constructor(private globalVars: GlobalVarsService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.globalVars.getVar("wk1Data") == "empty"){ // If user has no currently stored timetable data
      if(this.globalVars.getVar("timetableRaw") == "empty"){ // If user has not uploaded file
        this.router.navigate(["settings"]);
      }
      this.cleanData(); // Convert raw text file into timetable data
    }else{ 
      // Init calibration data
      this.initCalibrationData();
      if(this.globalVars.getVar("wk1IsWkA") == "true"){
        this.defaultCalibrationOption = "label1";
      }else if(this.globalVars.getVar("wk1IsWkA") == "false"){
        this.defaultCalibrationOption = "label2";
      }
      // Init current week letter and number
      if(this.globalVars.getVar("weekLetter") === "a"){
        this.currentWeekOption = "label1";
      }else if(this.globalVars.getVar("weekLetter") === "b"){
        this.currentWeekOption = "label2";
      }
      this.currentWeek = parseInt(this.globalVars.getVar("weekNumber"));
    }
  }

  cleanData():void{
    console.log("CLEANING");
    // Split the data into individual lines
    var inputData = this.globalVars.getVar("timetableRaw");
    var dataList: String[] = inputData.split("\n"); // Get an array of strings were each element is a new line in the .ical file
    

    // From ALL the available data, create a list of every period mentioned in the file 
    var periodsList: Period[] = [];
    for(var i=0; i < dataList.length; i++){
      if(dataList[i] == 'BEGIN:VEVENT\r'){ // If this line represents the start of a new line
        let datePair: Date[] = [];
        for(var k=0; k < 2; k++){
          let year: number = parseInt(dataList[i + (k*2) + 1].substring(24 - (2 * k), 28 - (2 * k)));
          let month: number = parseInt(dataList[i + (k*2) + 1].substring(28 - (2 * k), 30 - (2 * k))) - 1;
          let day: number = parseInt(dataList[i + (k*2) + 1].substring(30 - (2 * k), 32 - (2 * k)));
          let hour: number = parseInt(dataList[i + (k*2) + 1].substring(33 - (2 * k), 35 - (2 * k)));
          let minute: number = parseInt(dataList[i + (k*2) + 1].substring(35 - (2 * k), 37 - (2 * k)));
          let date = new Date(Date.UTC(year, month, day, hour, minute, 0));
          datePair.push(date);
        }
        let desc: string = dataList[i + 5].substring(12);  
        let teacher: string = desc.substring(9, desc.indexOf("\\n"));
        let period: string = desc.substring(desc.indexOf("\\n") + 10);
        let className: string = dataList[i + 6].substring(8);
        let location: string = dataList[i + 7].substring(9);
       
        if(dataList[i+ 8] == "END:VEVENT\r"){ // Double checks file strucrture before appending list
          periodsList.push({
            "startDate": datePair[0],
            "endDate": datePair[1],
            "teacher": teacher,
            "period": period,
            "classname": className,
            "location": location
          });
        }
      } 
    }

    // Sort the list of periods (Should be sorted by the .ical file but is always useful)
    periodsList.sort((a: Period, b: Period)=>{
      return a.startDate.getTime() - b.startDate.getTime();
    });
    // Find 2 full, different weeks to allow the user to specify which is week A or week B
    var wk1StartIndex: number = 0;
    var wk2StartIndex: number = 0;
    var wk2EndIndex: number = 0;

    // Find the start of week 1 (The first monday present in the file)
    for(var i = 0; i < periodsList.length; i++){
        if(periodsList[i].startDate.getDay() == 1){ //If the class is on a monday
            wk1StartIndex = i;
            break;
        }
    }
    // Find the start of week 2 (The first monday present that ISN'T the same as the start of week 1)
    for(var i = 0; i < periodsList.length; i++){
      if(periodsList[i].startDate.getDay() == 1){ //If the class is on a monday
          if(periodsList[i].startDate.getDate() != periodsList[wk1StartIndex].startDate.getDate()){ //Ensure the start of week B isn't the same date as the start of week A
              wk2StartIndex = i;
              break;
          }
      }
  }
  // Find end of week 2 (The first friday AFTER the start of week 2)
    for(var i = wk2StartIndex; i < periodsList.length; i++){
        if(periodsList[i].startDate.getDay() == 5){ //If the class is on a Friday
            if(periodsList[i + 1].startDate.getDay() == 1){ // If the NEXT class is on Monday
                wk2EndIndex = i;
                break;
            } 
        }
      }
    // All the data for the possible weeks (At this stage it is still unknown whether wk 1 is A or B)
    var wk1Data: Period[] = periodsList.slice(wk1StartIndex, wk2StartIndex);
    var wk2Data: Period[] = periodsList.slice(wk2StartIndex, wk2EndIndex + 1);   
  
    // Seperate periods into an array, were each elem is a list containing all the subjects on a given day
    var sortedWk1Data: Array<Period[]> = [];
    var sortedWk2Data: Array<Period[]> = [];

    let thisDayList: Period[] = [];
    let lastDayIndex: number = new Date(wk1Data[0]["startDate"]).getDay();
    for(var i=0; i< wk1Data.length; i++){
      if(i == wk1Data.length - 1){ // If it is the final period in the array 
        thisDayList.push(wk1Data[i]);
        sortedWk1Data.push(thisDayList);
        break
      }

      if(wk1Data[i].startDate.getDay() == lastDayIndex){
        thisDayList.push(wk1Data[i]);
      }else{ // IF this period is the first period of the next day
        lastDayIndex = wk1Data[i].startDate.getDay();
        sortedWk1Data.push(thisDayList);
        thisDayList = [];
        thisDayList.push(wk1Data[i]);
      }
    } 

    // Do the same for week 2
    thisDayList = [];
    lastDayIndex = new Date(wk2Data[0].startDate).getDay();
    for(var i=0; i< wk2Data.length; i++){
      if(i == wk2Data.length - 1){
        thisDayList.push(wk2Data[i]);
        sortedWk2Data.push(thisDayList);
        break
      }

      if(wk2Data[i].startDate.getDay() == lastDayIndex){
        thisDayList.push(wk2Data[i]);
      }else{
        lastDayIndex = wk2Data[i].startDate.getDay();
        sortedWk2Data.push(thisDayList);
        thisDayList = [];
        thisDayList.push(wk2Data[i]);
      }
    }
    this.globalVars.setVar("wk1Data", JSON.stringify(sortedWk1Data));
    this.globalVars.setVar("wk2Data", JSON.stringify(sortedWk2Data));
    this.globalVars.setVar("wk1IsWkA", "unknown");
    this.initCalibrationData();
  }

  initCalibrationData():void{
    let wk1Data: Array<Period[]> = JSON.parse(this.globalVars.getVar("wk1Data"));
    for(var i=0; i<wk1Data[0].length; i++){
      wk1Data[0][i]["startDate"] = new Date(wk1Data[0][i]["startDate"]);
    }
    this.calibrationData = wk1Data[0];
  }

  updateCalibration(selectedWeek: String){
    if(selectedWeek === "Week A"){
      this.globalVars.setVar("wk1IsWkA", "true");
    }else if(selectedWeek === "Week B"){
      this.globalVars.setVar("wk1IsWkA", "false");
    }

  }

  updateWeekLetter(selectedLetter: String){
    if(selectedLetter === "Week A"){
      this.globalVars.setVar("weekLetter", "a");
    }else if(selectedLetter === "Week B"){
      this.globalVars.setVar("weekLetter", "b");
    }
  }

  updateWeekNumber(event: Event):void{
    event.preventDefault();
    this.globalVars.setVar("weekNumber", (document.getElementById("weekNumberInput") as HTMLInputElement).value.toString());
  }
}

