import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DisconnectWarningComponent } from './components/ui-components/disconnect-warning/disconnect-warning.component';
import { GlobalVarsService } from './services/globals/global-vars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Base Camp';
  public isAccurate: boolean = false;
  public canConnect: boolean = false;
  public showDisconnect: boolean = true;
  public shownError: boolean = false;
  public doCloudSync: boolean = false;

  @ViewChild(DisconnectWarningComponent) disconnectWarning: DisconnectWarningComponent;
  constructor(private globalVars: GlobalVarsService, private router: Router){}

  ngOnInit(){
    if(localStorage.getItem("globals") == null){
      this.router.navigate(["/setup/user"])
    }
    
    try{
      this.showDisconnect = JSON.parse(this.globalVars.getVar("showDisconnect"));
      this.doCloudSync = JSON.parse(this.globalVars.getVar("doCloudSync"))
    }catch(SyntaxError){}
    var checkData = setInterval(()=>{
      this.isAccurate = this.globalVars.hasAccurateData()[0];
      this.canConnect = this.globalVars.hasAccurateData()[1];
      if(this.isAccurate){
        clearInterval(checkData);
      }
    }, 50)

    setTimeout(()=>{ // Only start listening for the user to have seen the disconnect notice after 250ms
      try{
        this.disconnectWarning.state.subscribe(()=>{
          console.log("WOOO")
          this.shownError = true;
        })
      }catch(TypeError){} // Occurs if component is not rendered yet (i.e connection is possible or the warning is disabled)
    }, 250)
  }

  onActivate():void{ // Every time the user visits a new page, scroll to the top left
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
