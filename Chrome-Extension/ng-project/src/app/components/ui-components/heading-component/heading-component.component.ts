import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading-component',
  templateUrl: './heading-component.component.html',
  styleUrls: ['./heading-component.component.scss']
})
export class HeadingComponentComponent implements OnInit {
  @Input() line1Text: string;
  @Input() line2Text: string;


  constructor() { }

  ngOnInit(): void {
  }

}
