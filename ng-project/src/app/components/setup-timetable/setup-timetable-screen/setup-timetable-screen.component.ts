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
  public displayCalibration: boolean = false; 

  constructor(private globalVars: GlobalVarsService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.globalVars.getVar("timetableData") == "empty"){ // If user has no currently stored timetable data
      if(this.globalVars.getVar("timetableRaw") == "empty"){ // If user has not uploaded file
        this.router.navigate(["settings"]);
      }
      this.cleanData(); // Convert raw text file into timetable data
      

    }else{ 

    }
  }

  cleanData():void{
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
    var wk1Data = periodsList.slice(wk1StartIndex, wk2StartIndex);
    var wk2Data = periodsList.slice(wk2StartIndex, wk2EndIndex + 1);   
    
    for(var i=0; i<wk1Data.length; i++){
      if(wk1Data[i].startDate.getDay() == 1){
        this.calibrationData.push(wk1Data[i]);
      }
    }

    this.displayCalibration = true;
  }
}
      
            
            



      

      
  //     }


  // }
  // }


