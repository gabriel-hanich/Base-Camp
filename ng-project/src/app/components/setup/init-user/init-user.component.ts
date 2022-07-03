import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';

@Component({
  selector: 'app-init-user',
  templateUrl: './init-user.component.html',
  styleUrls: ['./init-user.component.scss']
})
export class InitUserComponent implements OnInit {
  public state: String = 'init'
  public doCloudSync: boolean = true;
  
  public statusMsg: String;

  constructor(private connections: ConnectionsService, private globalVars: GlobalVarsService, private router: Router) { }

  ngOnInit(): void {
    // this.globalVars.wipeStorage();
  }

  updateCloudState(state: String):void{
    this.doCloudSync = state === "Enable Cloud Sync";
  }
  
  loginUser(event: Event){
    event.preventDefault();
    this.globalVars.setVar("doCloudSync", JSON.stringify(this.doCloudSync));
    // Get the public key
    this.globalVars.getPublicKey().then(()=>{
      const email = (document.getElementById("emailInput") as HTMLInputElement).value;
      const pwd = (document.getElementById("passwordInput") as HTMLInputElement).value;
  
      this.globalVars.setVar("userEmail", email);
      this.connections.login(email, pwd, this.globalVars.getVar("serverPublicKey")).subscribe((res: any)=>{
        if(res["worked"]){
          this.globalVars.setVar("passwordToken", res["payload"]["Data"]);
          setTimeout(() => {
            this.globalVars.syncFromCloud().then(()=>{
              setTimeout(()=>{
                this.router.navigate([""]);
              }, 250)
            });
          }, 250);
        }
        if(!res["worked"]){
          this.statusMsg = "Either your username or password is incorrect"
          this.showStatusMsg(7500);
        }
      });
    });
  }

  updateUserSettings(event: Event):void{
    event.preventDefault();
    this.globalVars.getPublicKey().then(()=>{
      const userName = (document.getElementById("nameInput") as HTMLInputElement).value;
      this.globalVars.setVar("userName", userName as string);
      if(this.doCloudSync){
        var email = (document.getElementById("emailInput") as HTMLInputElement).value;
        // Ensure entered passwords match
        let password = (document.getElementById("passwordInput") as HTMLInputElement).value;
        let confirmedPassword = (document.getElementById("confirmPasswordInput") as HTMLInputElement).value;
        if(password != confirmedPassword){
          this.showStatusMsg(7500);
          this.statusMsg = "The passwords you entered do not match";
        }else{
          // Ensure no other account is in the DB with the same user name
          this.connections.validateUserEmail(email).subscribe((isUniqueEmail)=>{
            if(isUniqueEmail){
              this.globalVars.setVar("userEmail", email as string);
              this.globalVars.setVar("passwordLength", password.length.toString());
    
              this.connections.createNewUser(userName, email, password, this.globalVars.getVar("serverPublicKey")).subscribe((res)=>{
                this.statusMsg = "Saved :)";
                this.showStatusMsg(2500);
                this.globalVars.setVar("passwordToken", (res as string));
                setTimeout(()=>{
                  this.router.navigate([""]);
                }, 3000)
              });
            }else{
              this.statusMsg = "An account already exists with this email";
              this.showStatusMsg(2500);
            }
          });
        }
      }
    });
    
  }

  showStatusMsg(delay: number):void{
    document.getElementById("msgBox")?.classList.add("showError");
    setTimeout(()=>{
      document.getElementById("msgBox")?.classList.remove("showError");
    }, delay)
  }

  createLocalUser(event: Event): void{
    event.preventDefault();
    let name: string = (document.getElementById("localNameInput") as HTMLInputElement).value;
    // Init user with default/empty values
    this.globalVars.setVar("userName", name);
    this.globalVars.setVar("doCloudSync", JSON.stringify(false));
    this.globalVars.setVar("wk1Data", JSON.stringify([]));
    this.globalVars.setVar("wk2Data", JSON.stringify([]));
    this.globalVars.setVar("wk1IsWkA", JSON.stringify(false));
    this.globalVars.setVar("noteList", JSON.stringify([]));
    this.globalVars.setVar("studyNoteList", JSON.stringify([]));
    this.globalVars.setVar("widgetsLayout", JSON.stringify([]));
    this.globalVars.setVar("lastSignInTime", JSON.stringify(new Date().getTime()));

    setTimeout(()=>{
      this.router.navigate(["/"]);
    }, 250)
  }


}
