import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit {
  @Input() label1: String;
  @Input() label2: String;
  @Input() defaultVal: String;
  @Input() elemID: string;

  @Output() state: EventEmitter<String> = new EventEmitter<String>();


  public stateStr: String;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      if(this.defaultVal == "label1"){
        document.getElementById(this.elemID + "leftLabel")?.classList.add("clicked");
      }else if(this.defaultVal == "label2"){
        document.getElementById(this.elemID + "rightLabel")?.classList.add("clicked");
      }
    }, 150);
  }
  
  updateState(val: "label1" | "label2"){
    if(val == "label1"){
      document.getElementById(this.elemID + "leftLabel")?.classList.add("clicked");
      document.getElementById(this.elemID + "rightLabel")?.classList.remove("clicked");
      this.stateStr = this.label1
    }else if(val == "label2"){
      document.getElementById(this.elemID + "rightLabel")?.classList.add("clicked");
      document.getElementById(this.elemID + "leftLabel")?.classList.remove("clicked");
      this.stateStr = this.label2
    }
    this.state.emit(this.stateStr);
  }

}
