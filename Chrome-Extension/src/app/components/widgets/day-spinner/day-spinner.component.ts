import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-day-spinner',
  templateUrl: './day-spinner.component.html',
  styleUrls: ['./day-spinner.component.scss']
})
export class DaySpinnerComponent implements OnInit {
  @Output() btnPress: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  onBtnClick():void{
    this.btnPress.emit("Pressed");
  }

}
