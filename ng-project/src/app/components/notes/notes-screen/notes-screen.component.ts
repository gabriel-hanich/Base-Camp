import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Note } from 'src/models';

@Component({
  selector: 'app-notes-screen',
  templateUrl: './notes-screen.component.html',
  styleUrls: ['./notes-screen.component.scss']
})
export class NotesScreenComponent implements OnInit {
  public currentNoteTitle: String = "";
  public currentNoteContent: String = "";
  public currentCategoryCount: number[] = [];
  public noteList: Note[];
  
  private currentCategoryList: String[] = [];
  constructor(private globalVar: GlobalVarsService) { }
  
  ngOnInit(): void {
    this.setNotesList();
  }

  setNotesList(): void{
    this.noteList = JSON.parse(this.globalVar.getVar("noteList"));
    
  }
  updateTagList():void{
    // Compute existing tags
    let tags = document.getElementsByClassName("newCategoryText");
    for(var i=0; i<tags.length; i++){
      this.currentCategoryList[i] = tags[i].textContent as string;
    }
  }

  addTag():void{
    this.updateTagList();
    this.currentCategoryCount.push(0);
    this.currentCategoryList.push("New Tag");
    console.log(this.currentCategoryList);
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
        "isArchived": false,
        "timeCreated": new Date().getTime()
      });
      this.globalVar.setVar("noteList", JSON.stringify(this.noteList));
      console.log(this.noteList);
    }, 50)
  }

}
