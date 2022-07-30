import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
;

@Component({
  selector: 'app-disconnect-warning',
  templateUrl: './disconnect-warning.component.html',
  styleUrls: ['./disconnect-warning.component.scss']
})
export class DisconnectWarningComponent implements OnInit {
  public label2Msg = "Don't show this again"
  private showMsg: boolean = true;
  
  @Output() state: EventEmitter<void> = new EventEmitter<void>();
  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
  }
  
  updateMsgStatus(value: String){
    this.showMsg = (value == "Show this message every time");
    this.globalVars.setVar("showDisconnect", JSON.stringify(this.showMsg));
  }

}
