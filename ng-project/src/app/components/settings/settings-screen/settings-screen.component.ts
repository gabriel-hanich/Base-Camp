import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.scss']
})
export class SettingsScreenComponent implements OnInit {
  public screenWidth: number = screen.width;
  public hasSettings: boolean = true;

  public version = environment.version;
  public build = environment.build;
  public device = environment.device;

  constructor() { }

  ngOnInit(): void {
  
  }
  
  @HostListener('document:click', ['$event'])
  onClickHandler(event: MouseEvent){
    if(event.pageX / window.innerWidth < 0.1 || event.pageX / window.innerWidth > 0.9){
      if((event.target as unknown as HTMLElement).id == "background"){
        this.closeCurrentPopup();
      }
    }
  }
  
  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if(event.key == "Escape"){
      this.closeCurrentPopup();
    }
  }

  closeCurrentPopup():void{
    let optionElemList: HTMLCollection = document.getElementsByClassName("options-item-container");
    (document.getElementById("background") as HTMLElement).classList.remove('dim');
    for(var i:number=0; i<optionElemList.length; i++){
      optionElemList[i].classList.remove("expanded");
      optionElemList[i].classList.remove("fade");
      }
    }
    
    expandPopUp(id: string):void{
      let optionElemList: HTMLCollection = document.getElementsByClassName("options-item-container");
      for(var i=0; i<optionElemList.length; i++){
        if(optionElemList[i].id != id){
          optionElemList[i].classList.add('fade');
        }
      }
      setTimeout(() => {
        document.getElementById(id)?.classList.add("expanded");
      }, 250);
      setTimeout(() => {
        document.getElementById("background")?.classList.add("dim");
      }, 500);
  }

}
