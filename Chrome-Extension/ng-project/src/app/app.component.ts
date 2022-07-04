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
    if(localStorage.getItem("globals") == null){
      this.router.navigate(["/setup/user"]);
    }

    // Only render page when globalVars are accurate
    var checkData = setInterval(()=>{
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
