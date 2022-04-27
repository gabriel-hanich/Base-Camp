import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public userName: string = this.globalVars.getVar("userName");

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
  }

}
