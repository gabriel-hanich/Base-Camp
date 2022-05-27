import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-setup-timetable-screen',
  templateUrl: './setup-timetable-screen.component.html',
  styleUrls: ['./setup-timetable-screen.component.scss']
})
export class SetupTimetableScreenComponent implements OnInit {



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
    var dataList: String[] = inputData.split("\n"); // Get an array pf strings were each element is a new line in the .ical file

    console.log(dataList);
  }
      
  //     var periodsList = [];
  //     for(var i=0; i < dataList.length; i++){
  //         if(dataList[i] == "BEGIN:VEVENT"){
  //             var datePair = []; // Array containing the start datetime and end datetime of the period
  //             for(var k=0; k < 2; k++){
  //                 var year = dataList[i + (k*2) + 1].substring(24 - (2 * k), 28 - (2 * k));
  //                 var month = parseInt(dataList[i + (k*2) + 1].substring(28 - (2 * k), 30 - (2 * k))) - 1;
  //                 month = month.toString();
  //                 var day = dataList[i + (k*2) + 1].substring(30 - (2 * k), 32 - (2 * k));
  //                 var hour = dataList[i + (k*2) + 1].substring(33 - (2 * k), 35 - (2 * k));
  //                 var minute = dataList[i + (k*2) + 1].substring(35 - (2 * k), 37 - (2 * k));
  //                 var date = new Date(Date.UTC(year, month, day, hour, minute, 0));
  //                 datePair.push(date);
  //             }
              
  //             var desc = dataList[i + 5].substring(12);  
  //             var className = dataList[i + 6].substring(8);
  //             var location = dataList[i + 7].substring(9);
  //             var teacher = desc.substring(9, desc.indexOf("\\n"));
  //             var period = desc.substring(desc.indexOf("\\n") + 10);
              

  //             if(dataList[i+ 8] == "END:VEVENT"){ // Double checks file strucrture before appending list
  //                 periodsList.push(new periodClass(datePair, teacher, period, className, location));
  //             }
          
  //         }
  // }

  // // Find 2 full, different weeks to allow the user to specify which is week A or week B
  // function sortWeeks(periodsList){
  //     // Sort list by dates of periods (should already be sorted in the iCal file but this is a fallback)
  //     periodsList.sort(function(a, b){
  //         return a.datePair[0] - b.datePair[0];
  //     });

  //     var aStartIndex = 0;
  //     var bStartIndex = 0;
  //     var bEndIndex = 0;
  //     for(var i = 0; i < periodsList.length; i++){
  //         if(periodsList[i].datePair[0].getDay() == 1){ //If the class is on a monday
  //             aStartIndex = i;
  //             break;
  //         }
  //     }

  //     for(var i = 0; i < periodsList.length; i++){
  //         if(periodsList[i].datePair[0].getDay() == 1){ //If the class is on a monday
  //             if(periodsList[i].datePair[0].getDate() != periodsList[aStartIndex].datePair[0].getDate()){ //Ensure the start of week B isn't the same date as the start of week A
  //                 bStartIndex = i;
  //                 break;
  //             }
  //         }
  //     }

  //     //Find end of week b
  //     for(var i = bStartIndex; i < periodsList.length; i++){
  //         if(periodsList[i].datePair[0].getDay() == 5){ //If the class is on a Friday
  //             if(periodsList[i + 1].datePair[0].getDay() == 1){ // If the NEXT class is on Monday
  //                 bEndIndex = i;
  //                 break;
  //             } 
  //         }
  //     }

  //     var weekAData = periodsList.slice(aStartIndex, bStartIndex);
  //     var weekBData = periodsList.slice(bStartIndex, bEndIndex + 1);
  //     // Store data
  //     localStorage.setItem("possibleAData", JSON.stringify(weekAData));
  //     localStorage.setItem("possibleBData", JSON.stringify(weekBData));
      
  //     window.location.href = "../pages/validateWeekStatus.html";

  // }
  // }

}

