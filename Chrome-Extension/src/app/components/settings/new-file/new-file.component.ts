import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {
  public hasTimetable: boolean = false;

  constructor(private globalVars: GlobalVarsService, private router: Router) { }

  ngOnInit(): void {
    if(this.globalVars.getVar("wk1Data") != "empty" && this.globalVars.getVar("wk1Data") != "[]"){
      this.hasTimetable = true;
    }
  }
  onFileUpload(event: Event):void{
    // Declare globals within local scope so they can be accessed in the reader EventListener
    let globals = this.globalVars
    let router = this.router
    var file = (event.target as unknown as HTMLInputElement).files as FileList;
    var reader = new FileReader();
    reader.addEventListener('load', function(event){
        globals.setVar("timetableRaw", reader.result as string);
        router.navigate(["upload_timetable_file"]);
      });
      reader.readAsText(file[0])
    }

  openTimetablePage(): void{
    this.router.navigate(["upload_timetable_file"]);
  }
}
