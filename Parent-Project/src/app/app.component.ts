import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from './services/globals/global-vars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Base Camp';
  public isAccurate = false;

  constructor(private globalVars: GlobalVarsService, private router: Router){}

  ngOnInit(){
    if(!localStorage.getItem("globals")){ // Send the user to the setup page if they have never logged in b4
      this.router.navigate(["setup/user"])
    }
    var checkData = setInterval(()=>{ // Only load the page once accurate data has been recieved from the cloud
      this.isAccurate = this.globalVars.hasAccurateData();
      if(this.isAccurate){
        clearInterval(checkData);
      }
    }, 50)
  }

  onActivate():void{ // Every time the user visits a new page, scroll to the top left
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
