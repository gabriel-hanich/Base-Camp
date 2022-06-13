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
  // Current note vars
  public currentNoteTitle: String = "";
  public currentNoteContent: String = "";
  private currentCategoryList: String[] = [];
  
  // Search input vars
  private searchStr: String = "";
  private searchCategories: String[] = [];
  private sortType: String = "newest";

  public displayNoteList: Note[]; // Array containing all notes to be displayed
  private noteList: Note[]; // Array containing all notes that are stored

  @ViewChild(TextInputComponent) textInput:TextInputComponent;
  @ViewChild(CategoriesListComponent) categoryInput:CategoriesListComponent;

  constructor(private globalVar: GlobalVarsService) { }
  
  ngOnInit(): void {
    this.setNotesList();
  }

  setNotesList(): void{
    // Read the note notelist from vars
    this.noteList = JSON.parse(this.globalVar.getVar("noteList"));
    this.displayNoteList = this.noteList;
  }

  updateCategoryList(event: String[]):void{
    // Update the current category list when it changes
    this.currentCategoryList = event;
  }

  updateNoteContent(event: String): void{
    // Update stored note content on keypress
    this.currentNoteContent = event;
  }

  newNote(event: Event): void{
    // Add new note to the list and save the current list to global var
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
      setTimeout(()=>{
        // Remove content from form elems
        (document.getElementById('newNoteTitle') as HTMLInputElement).value = "";
        this.textInput.setContent("");
        this.categoryInput.setTaglist([]);
        this.refreshDisplayNotes();
      })
    }, 50)
  }

  deleteNote(note: Note){
    // Remove selected note
    for(var i=0; i<this.noteList.length; i++){
      if(this.noteList[i] == note){
        this.noteList.splice(i, 1);
        this.globalVar.setVar("noteList", JSON.stringify(this.noteList));
        this.refreshDisplayNotes();
        break;
      }
    }
  }

  editNote(note: Note){
    // Set titleInput, categoryList and noteContentInput to the editable note
    document.getElementById('newNoteContainer')?.classList.add('extended');
    (document.getElementById('newNoteTitle') as HTMLInputElement).value = (note.title as string);
    this.textInput.setContent(note.content);
    this.categoryInput.setTaglist(note.categoryList);
    window.scroll({top: 0, left: 0, behavior: "smooth"});
    setTimeout(()=>{
      this.deleteNote(note); // Remove the note to limit possibility of note being saved twice
    }, 150)
  }

  updateSearchString(input: HTMLInputElement){
    setTimeout(()=>{
      this.searchStr = input.value
      this.refreshDisplayNotes();
    }, 50)
  }
  
  updateSearchCategories(event: String[]){
    this.searchCategories = event;
    this.refreshDisplayNotes();
  }

  updateSortType(type: String){
    this.sortType = type;
    this.refreshDisplayNotes();
  }

  refreshDisplayNotes():void{
    // Get notes that fits the categories
    this.displayNoteList = [];
    let noteFits: boolean = true;
    for(var i=0; i<this.noteList.length; i++){
      // Check to ensure at least part of the title is present
      if(this.searchStr.toLowerCase().includes(this.noteList[i]["title"].toLowerCase() as string) || 
        this.noteList[i]["title"].toLowerCase().includes(this.searchStr.toLowerCase() as string)){
        noteFits = true;
        for(var j=0; j<this.searchCategories.length; j++){
          if(!this.noteList[i]["categoryList"].includes(this.searchCategories[j])){
            noteFits = false;
          }
        }
        if(noteFits){
          this.displayNoteList.push(this.noteList[i]);
        }
      }
    }

    // Sort the notes
    if(this.sortType == "newest"){
      this.displayNoteList.sort((a, b)=>{
        if(a.timeCreated < b.timeCreated){
          return 1;
        }else if(a.timeCreated > b.timeCreated){
          return -1;
        }
        return 0;
      });
    }else if(this.sortType == "oldest"){
      this.displayNoteList.sort((a, b)=>{
        if(a.timeCreated < b.timeCreated){
          return -1;
        }else if(a.timeCreated > b.timeCreated){
          return 1;
        }
        return 0;
      });
    }else if(this.sortType == "alphabetical"){
      this.displayNoteList.sort(function(a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    }
  }


}
