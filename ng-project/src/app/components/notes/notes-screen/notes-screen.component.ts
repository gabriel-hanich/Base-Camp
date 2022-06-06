import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-notes-screen',
  templateUrl: './notes-screen.component.html',
  styleUrls: ['./notes-screen.component.scss']
})
export class NotesScreenComponent implements OnInit {
  public displayNewNote: boolean = false; 

  constructor(private globalVar: GlobalVarsService) { }

  ngOnInit(): void {
  }

  displayForm():void{
    
  }

}
