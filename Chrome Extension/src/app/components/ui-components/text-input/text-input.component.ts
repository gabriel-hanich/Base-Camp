import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
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

  public editor: any;
  public innerText: string;

  public val: String = "";

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
  }

  initEditor(event: EventObj<Event>){
    // Get the editor obj and set the placeholder text 
    this.editor = event.editor
    if(this.initText){
      event.editor.setContent(this.initText);
    }
    
  }
  setContent(content: String) {
    // Manually force the content within the input
    setTimeout(()=>{
      this.userInput.emit(content);
      this.editor.setContent(content);
    }, 150)
  }

  onKeyPress(event: EventObj<Event>){
    // Update parent every key press
    this.userInput.emit(event.editor.getContent());
  }

}

