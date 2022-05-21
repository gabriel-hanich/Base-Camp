import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private globalVars: Map<string, string> = new Map();

  constructor() { 
    if(localStorage.getItem("globals") != undefined){
      this.globalVars = new Map(JSON.parse(localStorage.getItem("globals") as string));
    }else{
      this.setDefaultVals();
    }
  }
  
  setDefaultVals(){
    this.setVar("userName", "Gabriel");
    this.setVar("newsAdress", "http://localhost:3000/")
  }

  saveVars(){
    localStorage.setItem("globals", JSON.stringify(Array.from(this.globalVars.entries())));
    console.log("SAVING")
    console.log(this.globalVars);
    console.log(JSON.stringify(this.globalVars));
  }

  setVar(key: string, val: string){
    this.globalVars.set(key, val);
    setTimeout(()=>{
      this.saveVars();
    }, 150)
  }

  getVar(key: string): string {
    if(this.globalVars.get(key)){
      return this.globalVars.get(key) as string
    }else{
      return "empty"
    }
  }

}
