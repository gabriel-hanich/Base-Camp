import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Period, StudyNote } from 'src/models';

@Component({
  selector: 'app-study-notes-page',
  templateUrl: './study-notes-page.component.html',
  styleUrls: ['./study-notes-page.component.scss']
})
export class StudyNotesPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changePage(destination: String):void{
    this.router.navigate([destination])
  }

}
