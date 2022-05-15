import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.scss']
})
export class SettingsScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @HostListener('document:click', ['$event'])
  onClickHandler(event: MouseEvent){
    console.log(event.pageX / window.innerWidth);
    if(event.pageX / window.innerWidth < 0.1 || event.pageX / window.innerWidth > 0.9){
      this.closeCurrentPopup();
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
        if(optionElemList[i].classList.contains("expanded")){
          optionElemList[i].classList.remove("expanded");
          break;
        }
      }
  }

}
