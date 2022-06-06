import { Component, OnInit } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EventObj } from '@tinymce/tinymce-angular/editor/Events';
import { GlobalVarsService } from 'src/app/services/global-vars.service';


@Component({
  selector: 'app-notes-input',
  templateUrl: './notes-input.component.html',
  styleUrls: ['./notes-input.component.scss']
})
export class NotesInputComponent implements OnInit {
  public apiKey: string = this.globalVars.getVar("tinyKey");
  public val: String = "";

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
  }

  initEditor(event: EventObj<Event>){
    if(this.globalVars.getVar("noteVal") != "empty"){
      event.editor.setContent(this.globalVars.getVar("noteVal"));
    }

  }

  onKeyPress(event: EventObj<Event>){
    this.globalVars.setVar("noteVal", event.editor.getContent())
  }

}
