import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
