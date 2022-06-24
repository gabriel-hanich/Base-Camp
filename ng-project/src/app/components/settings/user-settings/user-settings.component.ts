import { Component, OnInit } from '@angular/core';
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
  public passwordLength: number = 0;

  public errorMsg: String = "";

  constructor(private globalVars: GlobalVarsService) {  }

  ngOnInit(): void {
    this.doCloudSync = JSON.parse(this.globalVars.getVar("doCloudSync"));
    this.userName = this.globalVars.getVar("userName");
    if(this.doCloudSync){
      this.defaultToggleVal = "label1"
      this.email = this.globalVars.getVar("userEmail");
      this.passwordLength = parseInt(this.globalVars.getVar("passwordLength")) | 0;
    }else{
      this.defaultToggleVal = "label2"
    }
    if(this.email == "empty"){
      this.email = "";
    }
  }
  
  updateCloudState(state: String):void{
    this.doCloudSync = state === "Enable Cloud Sync"
    this.globalVars.setVar("doCloudSync", JSON.stringify(this.doCloudSync));
  }

  updateUserSettings(event: Event):void{
    event.preventDefault();
    this.userName = (document.getElementById("nameInput") as HTMLInputElement).value;
    this.globalVars.setVar("userName", this.userName as string);
    if(this.doCloudSync){
      let doSave: boolean = true;
      this.email = (document.getElementById("emailInput") as HTMLInputElement).value;
      // Ensure entered passwords match
      let password = (document.getElementById("passwordInput") as HTMLInputElement).value;
      let confirmedPassword = (document.getElementById("confirmPasswordInput") as HTMLInputElement).value;
      if(password != confirmedPassword){
        this.showErrorMsg(7500);
        this.errorMsg = "The passwords you entered do not match";
        doSave = false;
      }
      // Ensure no other account is in the DB with the same user name
      if(doSave){
        this.errorMsg = "Saved :)";
        this.showErrorMsg(2500);
        this.globalVars.setVar("userEmail", this.email as string);
        this.globalVars.setVar("passwordLength", password.length.toString());
      }
    }
  }

  showErrorMsg(delay: number):void{
    document.getElementById("errorBox")?.classList.add("showError");
    setTimeout(()=>{
      document.getElementById("errorBox")?.classList.remove("showError");
    }, delay)
  }
  
}
