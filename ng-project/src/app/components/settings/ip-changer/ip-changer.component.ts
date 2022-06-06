import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-ip-changer',
  templateUrl: './ip-changer.component.html',
  styleUrls: ['./ip-changer.component.scss']
})
export class IpChangerComponent implements OnInit {
  public currentAdress: string;
  public currentKey: string;
  public submitText: string = "Submit";

  constructor(private globalVars: GlobalVarsService) {  }

  ngOnInit(): void {
    this.updateSetAdress();
  }
  
  updateSetAdress():void{
    this.currentAdress = this.globalVars.getVar("newsAdress");
    this.currentKey = this.globalVars.getVar("tinyKey");
  }
  
  updateAddress(event: Event){
    event.preventDefault();
    let enteredAdress: string = (document.getElementById("addressInput") as HTMLInputElement).value as string;
    let tinyKey: string = (document.getElementById("keyInput") as HTMLInputElement).value as string;
    this.globalVars.setVar("newsAdress", enteredAdress);
    this.globalVars.setVar("tinyKey", tinyKey);
    this.updateSetAdress();
    this.submitText = "Submitted :)"
    setTimeout(()=>{
      this.submitText = "Submit"
    }, 2000)
  }
}
