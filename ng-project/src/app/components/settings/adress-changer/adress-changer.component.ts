import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-adress-changer',
  templateUrl: './adress-changer.component.html',
  styleUrls: ['./adress-changer.component.scss']
})
export class AdressChangerComponent implements OnInit {
  public currentAdress: string;
  public submitText: string = "Submit";
  public defaultToggleVal: String;
  public doCloudSync: boolean;

  constructor(private globalVars: GlobalVarsService) {  }

  ngOnInit(): void {
    this.doCloudSync = JSON.parse(this.globalVars.getVar("doCloudSync"));
    this.currentAdress = this.globalVars.getVar("dbAdress");
    if(this.currentAdress === "empty"){
      this.currentAdress = "";
    }

    if(this.doCloudSync){
      this.defaultToggleVal = "label1"
    }else{
      this.defaultToggleVal = "label2"
    }
  }
  
  updateCloudState(state: String):void{
    this.doCloudSync = state === "Enable Cloud Sync"
    this.globalVars.setVar("doCloudSync", JSON.stringify(this.doCloudSync));
  }
  
  updateAddress(event: Event){
    event.preventDefault();
    let enteredAdress: string = (document.getElementById("addressInput") as HTMLInputElement).value as string;
    this.globalVars.setVar("dbAdress", enteredAdress);
    this.submitText = "Submitted :)"
    setTimeout(()=>{
      this.submitText = "Submit"
    }, 2000)
  }
}
