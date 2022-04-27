import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private globalVars: Map<string, string> = new Map();

  constructor() { 
    this.setVar("userName", "Gabriel");
  }

  setVar(key: string, val: string){
    this.globalVars.set(key, val);
  }

  getVar(key: string): string {
    if(this.globalVars.get(key)){
      return this.globalVars.get(key) as string
    }else{
      return "empty"
    }
  }

}
