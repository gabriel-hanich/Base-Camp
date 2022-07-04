import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionsService } from '../connections/connections.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {
  private globalVars: Map<string, string> = new Map();
  private isAccurate: boolean = false;  

  constructor(private connections: ConnectionsService) { 
    if(localStorage.getItem("globals") != null){
      this.globalVars = new Map(JSON.parse(localStorage.getItem("globals") as string));
       // Calculate whether it is wk A or B
       if(JSON.parse(this.getVar("doCloudSync"))){
         this.syncFromCloud().then(()=>{
           this.setVar("lastSignInTime", JSON.stringify(new Date().getTime()));
           this.isAccurate = true
         });
        }else{
          this.isAccurate = true;
        }
      this.calcCurrentWk();
      }else{
        this.isAccurate = true;
      }
    
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
        console.log("INVERT");
        if(this.getVar('weekLetter') == "a"){
          this.setVar("weekLetter", "b");
        }else if(this.getVar('weekLetter') == "b"){
          this.setVar("weekLetter", "a");
        }
      }
    }
    // this.isAccurate = true
  }

  private getDaysArray(start: number, end:number): Date[] {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
  };
  

  public async syncFromCloud(): Promise<void>{
    return new Promise<void>((resolve, reject)=>{
      console.log("SYNCING")
      this.isAccurate = false;
      // Read current user data from the server
      this.connections.getUserData(this.getVar("userEmail"), this.getVar("passwordToken")).subscribe((res)=>{
        let cloudKeys = Object.keys(res[0]);
        for(var i=0; i<cloudKeys.length; i++){
          if(environment.keysToSync.includes(cloudKeys[i])){
            if(typeof res[0][cloudKeys[i]] == 'string'){
              this.setVar(cloudKeys[i], res[0][cloudKeys[i]], false);
            }else{
              this.setVar(cloudKeys[i], JSON.stringify(res[0][cloudKeys[i]]), false);
            }
          }
        }
        resolve();
      });
  });
  }

  private saveVars(){
    localStorage.setItem("globals", JSON.stringify(Array.from(this.globalVars.entries())));
    console.log("SAVING")
  }

  wipeStorage():void{
    localStorage.clear();
    this.globalVars = new Map();
    this.isAccurate = true;
  }

  hasAccurateData():boolean{
    return this.isAccurate;
  }

  getPublicKey(): Promise<void>{
    return new Promise<void>((resolve, reject)=>{
        // Get the current RSA public key from the server
        this.connections.getPublicKey().then((res)=>{
          this.setVar("serverPublicKey", res as string);
          setTimeout(()=>{
            resolve();
          }, 50)
        });
    });
  }

  setVar(key: string, val: string, doCloudSync?: boolean){
    this.globalVars.set(key, val);
    setTimeout(()=>{
      this.saveVars();
    }, 50)
    if(environment.keysToSync.includes(key) && doCloudSync != false && this.getVar("doCloudSync") == "true"){
      var valToUpload: any = val;
      try{
        valToUpload = JSON.parse(valToUpload);
      }catch(SyntaxError){
      }
      let intVal: number = parseInt(valToUpload);
      if(!Number.isNaN(intVal)){
        valToUpload = intVal;
      }
      this.connections.setUserData(this.getVar("userEmail"), this.getVar("passwordToken"), key, valToUpload).subscribe((res)=>{
        console.log(key + " Updated on the cloud")
      });
    }

  }

  getVar(key: string): string {
    if(this.globalVars.get(key)){
      return this.globalVars.get(key) as string
    }else{
      return "empty"
    }
  }

}
