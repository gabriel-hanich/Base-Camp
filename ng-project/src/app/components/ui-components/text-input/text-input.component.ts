import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventObj } from '@tinymce/tinymce-angular/editor/Events';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  @Input() initText: string;
  @Output() userInput: EventEmitter<String> = new EventEmitter<String>();

  public val: String = "";

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
  }

  initEditor(event: EventObj<Event>){
    if(this.initText){
      event.editor.setContent(this.initText);
    }

  }

  onKeyPress(event: EventObj<Event>){
    this.userInput.emit(event.editor.getContent());
  }

}

