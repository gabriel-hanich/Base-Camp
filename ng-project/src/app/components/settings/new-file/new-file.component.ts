import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onElemScroll():void{
    document.getElementById('scrollIco')?.classList.add('fade')
  }
}
