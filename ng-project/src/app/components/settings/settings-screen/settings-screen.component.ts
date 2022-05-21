import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.scss']
})
export class SettingsScreenComponent implements OnInit {
  public screenWidth: number = screen.width;

  constructor() { }

  ngOnInit(): void {
  }
  
  @HostListener('document:click', ['$event'])
  onClickHandler(event: MouseEvent){
    if(event.pageX / window.innerWidth < 0.1 || event.pageX / window.innerWidth > 0.9){
      if((event.target as unknown as HTMLElement).id == "background"){
        this.closeCurrentPopup();
        console.log(event)
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
        if(optionElemList[i].classList.contains("expanded")){
          optionElemList[i].classList.remove("expanded");
          break;
        }
      }
  }

}
