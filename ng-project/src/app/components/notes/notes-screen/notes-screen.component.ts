import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Note } from 'src/models';
import { CategoriesListComponent } from '../../ui-components/categories-list/categories-list.component';
import { TextInputComponent } from '../../ui-components/text-input/text-input.component';

@Component({
  selector: 'app-notes-screen',
  templateUrl: './notes-screen.component.html',
  styleUrls: ['./notes-screen.component.scss']
})
export class NotesScreenComponent implements OnInit {
  public currentNoteTitle: String = "";
  public currentNoteContent: String = "";
  public noteList: Note[];
  
  @ViewChild(TextInputComponent) textInput:TextInputComponent;
  @ViewChild(CategoriesListComponent) categoryInput:CategoriesListComponent;

  private currentCategoryList: String[] = [];
  constructor(private globalVar: GlobalVarsService) { }
  
  ngOnInit(): void {
    this.setNotesList();
  }

  setNotesList(): void{
    this.noteList = JSON.parse(this.globalVar.getVar("noteList"));
  }

  updateCategoryList(event: String[]):void{
    this.currentCategoryList = event;
  }

  updateNoteContent(event: String): void{
    this.currentNoteContent = event;
  }

  newNote(event: Event): void{
    event.preventDefault();
    this.currentNoteTitle = (document.getElementById('newNoteTitle') as HTMLInputElement).value;
    setTimeout(()=>{ // Allow for some time for events to properly fire
      this.noteList.push({
        "title": this.currentNoteTitle,
        "content": this.currentNoteContent,
        "author": this.globalVar.getVar('userName'),
        "isArchived": false,
        "timeCreated": new Date().getTime(),
        "categoryList": this.currentCategoryList
      });
      this.globalVar.setVar("noteList", JSON.stringify(this.noteList));
      console.log(this.noteList);
    }, 50)
  }

  deleteNote(note: Note){
    for(var i=0; i<this.noteList.length; i++){
      if(this.noteList[i] == note){
        this.noteList.splice(i, 1);
        this.globalVar.setVar("noteList", JSON.stringify(this.noteList));
        break;
      }
    }
  }
  editNote(note: Note){

    document.getElementById('newNoteContainer')?.classList.add('extended');
    (document.getElementById('newNoteTitle') as HTMLInputElement).value = (note.title as string);
    this.textInput.setContent(note.content);
    this.categoryInput.setTaglist(note.categoryList);
    window.scroll({top: 0, left: 0, behavior: "smooth"});
    setTimeout(()=>{
      this.deleteNote(note);

    }, 150)

  }

}
