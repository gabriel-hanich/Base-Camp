import { Component, EventEmitter, Input, OnInit } from '@angular/core';
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
  @Input() doTimes: boolean;
  @Input() displayEmitter: EventEmitter<String>;


  public dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  public dayName: string; 
  public isToday: boolean = false;

  public minutesRemaining: number; // How many minutes until the current class ends

  public displayClasses: boolean = true; // Tracks wether to display start/end times OR classes

  constructor() { }
  
  ngOnInit(): void{
    // Process whether or not the period/day should be highlighted
    let today = new Date();
    for(var i=0; i<this.timetableData.length; i++){
      this.timetableData[i]["classname"] = this.timetableData[i]["classname"].split(":")[1];
      if(this.isCurrentWeek && this.timetableData[i].startDate.getDay() == today.getDay()){ 
        // If the period is in the correct week (A or B) AND the same day as today
        this.isToday = true;

        // If the current time is between the start and end times for the period
        let startTime = new Date(today.getTime());
        startTime.setMinutes(this.timetableData[i]["startDate"].getMinutes());
        startTime.setHours(this.timetableData[i]["startDate"].getHours());
        
        let endTime = new Date(today.getTime());
        endTime.setMinutes(this.timetableData[i]["endDate"].getMinutes());
        endTime.setHours(this.timetableData[i]["endDate"].getHours());
        if(startTime < today && endTime > today){
          this.timetableData[i]['isCurrent'] = true;
          this.minutesRemaining = Math.round(endTime.getTime() - today.getTime()) / 60000;
        }

      }
    }
    if(this.displayEmitter){
      this.displayEmitter.subscribe(()=>{
        this.displayClasses = !this.displayClasses
        let currentBoxes: HTMLCollectionOf<Element>;
        let newBoxes: HTMLCollectionOf<Element>;
        if(this.displayClasses){
          currentBoxes = document.getElementsByClassName("timeBox");
          newBoxes = document.getElementsByClassName("classBox");
        }else{
          currentBoxes = document.getElementsByClassName("classBox");
          newBoxes = document.getElementsByClassName("timeBox");
        }
        for(var i=0; i<currentBoxes.length; i++){
          currentBoxes[i].animate([
          { transform: 'rotateX(0)' },
          { transform: 'rotateX(90deg)'}], {duration: 300, iterations: 1})
        }
        setTimeout(()=>{
          for(var i=0; i<currentBoxes.length; i++){
            currentBoxes[i].classList.add("hide");
          }
          for(var i=0; i<newBoxes.length; i++){
            newBoxes[i].classList.remove("hide");
            newBoxes[i].animate([
              { transform: 'rotateX(-90deg)' },
              { transform: 'rotateX(0deg)'}], {duration: 300, iterations: 1});
          }
        }, 285)
      })
    }
    
  }

}
