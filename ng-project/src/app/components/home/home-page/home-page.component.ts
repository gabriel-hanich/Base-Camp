import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public greetingText: string;
  public userName: string = this.globalVars.getVar("userName");
  public timeText: string = "00:00";

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
 this.updateTime();
    const loginTime = new Date();
    if(loginTime.getHours() < 10){
      this.greetingText = "Good Morning"
    }else if(loginTime.getHours() < 15){
      this.greetingText = "Hello"
    }else if(loginTime.getHours() < 18){
      this.greetingText = "Good Afternoon"
    }else{
      this.greetingText = "Good Evening"
    }

    setInterval(()=>{
      this.updateTime();
    }, 1000)
  }

  updateTime(): void{
    var currentTime: Date = new Date();
      var suffix: string = "am";
      var hours: number = currentTime.getHours()
      if(hours > 12){
        hours -= 12;
        suffix = "pm"
      }
      var minutes: string = currentTime.getMinutes().toString();
      if(minutes.length == 1){
        minutes = "0" + minutes
      }

      this.timeText = hours.toString() + ":" + minutes + suffix;
  }

}
