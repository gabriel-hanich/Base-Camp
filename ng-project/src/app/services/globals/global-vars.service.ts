import { Injectable } from '@angular/core';
import { ConnectionsService } from '../connections/connections.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private globalVars: Map<string, string> = new Map();
  private isAccurate: boolean = false;  

  constructor(private connections: ConnectionsService) { 
    if(localStorage.getItem("globals") != undefined){
      this.globalVars = new Map(JSON.parse(localStorage.getItem("globals") as string));
    }else{
      this.setDefaultVals();
    }
    // Calculate whether it is wk A or B
    this.calcCurrentWk();
    if(JSON.parse(this.getVar("doCloudSync"))){
      this.isAccurate = false;
      // Read current user data from the server
      this.getPublicKey().then(()=>{
        console.log("AA")
        if(this.getVar("passwordToken") != "empty"){
          this.connections.getUserData(this.getVar("userEmail"), this.getVar("passwordToken")).subscribe((res)=>{
            console.log(res);
            let cloudKeys = Object.keys(res[0]);
            for(var i=0; i<cloudKeys.length; i++){
              this.setVar(cloudKeys[i], res[0][cloudKeys[i]]);
            }
            this.isAccurate = true;
          });
        }
      });
    }
    this.setVar("lastSignInTime", JSON.stringify(new Date().getTime()));
  }

  private calcCurrentWk():void{
    // Switch the current wk from A to B (or vice versa) if it has been a week 
    let lastSignIn: Date = new Date(JSON.parse(this.getVar("lastSignInTime")));
    let today: Date = new Date();
    let inBetweenDays: Date[] = []
    if(today.getDate() != lastSignIn.getDate() || today.getMonth() != lastSignIn.getMonth()){ // If the app hasn't already been signed into today
      inBetweenDays = this.getDaysArray(lastSignIn.getTime(), today.getTime());
    }

    for(var i=0; i<inBetweenDays.length; i++){
      if(inBetweenDays[i].getDay() == 0){ // If there has been a sunday between the last sign in and the current date`
        // Invert the week letter
        console.log("INVERT")
        if(this.getVar('weekLetter') == "a"){
          this.setVar("weekLetter", "b");
        }else if(this.getVar('weekLetter') == "b"){
          this.setVar("weekLetter", "a");
        }
      }
    }
    this.isAccurate = true
  }

  private getDaysArray(start: number, end:number): Date[] {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
  };
  
  private setDefaultVals(){
    console.log("DEFAULT SET");
    this.setVar("widgetsLayout", JSON.stringify([]));
    this.setVar("doCloudSync", JSON.stringify(false));
    this.setVar("noteList", JSON.stringify([]));
    this.setVar("studyNoteList", JSON.stringify([]));
    this.setVar("lastSignInTime", JSON.stringify(new Date().getTime()));
  }

  private saveVars(){
    localStorage.setItem("globals", JSON.stringify(Array.from(this.globalVars.entries())));
    console.log("SAVING")
  }

  hasAccurateData():boolean{
    return this.isAccurate;
  }

  getPublicKey(): Promise<void>{
    return new Promise<void>((resolve, reject)=>{
        // Get the current RSA public key from the server
        this.connections.getPublicKey().then((res)=>{
          this.setVar("serverPublicKey", res as string);
          resolve();
        });
    });
  }

  setVar(key: string, val: string){
    this.globalVars.set(key, val);
    setTimeout(()=>{
      this.saveVars();
    }, 50)
  }

  getVar(key: string): string {
    if(!this.isAccurate){ // If the app hasn't already found the current week, wait for 150ms to allow it time
      setTimeout(()=>{}, 150)
    }
    if(this.globalVars.get(key)){
      return this.globalVars.get(key) as string
    }else{
      return "empty"
    }
  }

}
