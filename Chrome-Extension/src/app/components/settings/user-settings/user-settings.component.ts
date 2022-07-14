import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public defaultToggleVal: String;
  public doCloudSync: boolean;

  public userName: String = "";
  public email: String = "";
  public defaultLabel: String = "label1";

  public errorMsg: String = "";

  constructor(private globalVars: GlobalVarsService, private connections: ConnectionsService, private router: Router) {  }

  ngOnInit(): void {
    this.doCloudSync = JSON.parse(this.globalVars.getVar("doCloudSync"));
    this.userName = this.globalVars.getVar("userName");
    this.email = this.globalVars.getVar("userEmail");
    if(this.doCloudSync){
      this.defaultToggleVal = "label1"
    }else{
      this.defaultToggleVal = "label2"
    }
    if(this.email == "empty"){
      this.email = "No Email Inputted";
    }
    if(!JSON.parse(this.globalVars.getVar("showDisconnect"))){
      this.defaultLabel = "label2";
    }
  }
  
  updateCloudState(state: String):void{
    this.doCloudSync = state === "Enable Cloud Sync"
    if(this.doCloudSync){
      this.connections.getPublicKey(); // Get the public key if the connection is toggled on
    }
    this.globalVars.setVar("doCloudSync", JSON.stringify(this.doCloudSync));
  }

  updateUserSettings(event: Event):void{
    event.preventDefault();
    this.userName = (document.getElementById("nameInput") as HTMLInputElement).value;
    this.globalVars.setVar("userName", this.userName as string);
    this.errorMsg = "Saved :)"
    this.showErrorMsg(2500)
  }

  showErrorMsg(delay: number):void{
    document.getElementById("errorBox")?.classList.add("showError");
    setTimeout(()=>{
      document.getElementById("errorBox")?.classList.remove("showError");
    }, delay)
  }

  wipeApp():void{
    if(confirm("Are you sure you want to wipe the app.\nThis will NOT delete data on the cloud, however will erase ALL your data if cloud sync is disabled")){
      localStorage.clear();
      setTimeout(()=>{
        this.router.navigate(["setup/user"]);
      }, 50)
    }
  }

  updateDisconnectMsg(value: String):void{
    this.globalVars.setVar("showDisconnect", JSON.stringify(value == 'Show Disconnect Message'));
  }
  
}
