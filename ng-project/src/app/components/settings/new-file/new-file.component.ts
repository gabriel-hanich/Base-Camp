import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {

  constructor(private globalVars: GlobalVarsService, private router: Router) { }

  ngOnInit(): void {
  }

  onElemScroll():void{
  }

  onFileUpload(event: Event):void{
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
