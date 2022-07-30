import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss']
})
export class SidebarToggleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(): void{
    document.getElementById("sideBar")?.classList.toggle("sidebar-retracted")
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if(event.key == "Escape"){
      document.getElementById("sideBar")?.classList.add("sidebar-retracted");
    }
  }
  
  @HostListener('document:click', ['$event'])
  onClickHandler(event: MouseEvent){
    if(event.pageX / window.innerWidth > 0.2){
      document.getElementById("sideBar")?.classList.add("sidebar-retracted");
    }
  }

}
