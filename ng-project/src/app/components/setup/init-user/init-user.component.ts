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
  public state: String = 'signup'
  public doCloudSync: boolean = true;
  
  public statusMsg: String;

  constructor(private connections: ConnectionsService, private globalVars: GlobalVarsService, private router: Router) { }

  ngOnInit(): void {
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
  
      // Get the public key and store it
      this.connections.login(email, pwd, this.globalVars.getVar("serverPublicKey")).subscribe((res: any)=>{
        
        if(res["worked"]){
          this.globalVars.setVar("passwordToken", res["payload"]["Data"]);
          setTimeout(()=>{
            this.router.navigate([""]);
          }, 250)
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
          console.log("MISMATCH")
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


}
