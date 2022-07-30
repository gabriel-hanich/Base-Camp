import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
import { Note, Period, StudyNote } from 'src/models';

@Component({
  selector: 'app-view-study-notes',
  templateUrl: './view-study-notes.component.html',
  styleUrls: ['./view-study-notes.component.scss']
})
export class ViewStudyNotesComponent implements OnInit {
  public sortType: String = "newest";
  public totalSubjectsList: String[] = [];
  public categoriesList: String[] = [];
  public sortSubject: String;
  public searchText: String = "newest";

  private totalNotesList: StudyNote[] = [];
  public displayNotesList: StudyNote[] = [];

  public noteIsFullScreen: boolean = false;

  constructor(private router: Router, private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
     // Get a list containing the names of each subject present in the user's timetable
     let totalWkData: Array<Period[][]> = [JSON.parse(this.globalVars.getVar("wk1Data")), JSON.parse(this.globalVars.getVar("wk2Data"))];
     for(var i=0; i<totalWkData.length; i++){
       for(var j=0; j<totalWkData[i].length; j++){
         for(var k=0; k<totalWkData[i][j].length; k++){
           if(!this.totalSubjectsList.includes(totalWkData[i][j][k]["classname"].split(":")[1].trim())){
             this.totalSubjectsList.push(totalWkData[i][j][k]["classname"].split(":")[1].trim());
           }
         }
       }
     }
     // Sort alphabetically
     this.totalSubjectsList.sort(function(a, b) {
       var textA = a.toUpperCase();
       var textB = b.toUpperCase();
       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
     });
     this.sortSubject = this.totalSubjectsList[1];

     this.totalNotesList = JSON.parse(this.globalVars.getVar("studyNoteList"));
     this.updateDisplayNotes();
  }

  setSortType(type: String){
    this.sortType = type;
    this.updateDisplayNotes();
  }

  setSubject(subject: String){
    this.sortSubject = subject;
    this.updateDisplayNotes();
  }

  setCategoriesList(list: String[]){
    this.categoriesList = list;
    this.updateDisplayNotes();
  }

  setSearchText(): void{
    setTimeout(()=>{
      this.searchText = (document.getElementById("searchTextInput") as HTMLInputElement).value;
      this.updateDisplayNotes();
    }, 50)
  }

  updateDisplayNotes():void{
    this.displayNotesList = [];
    switch(this.sortType){
      case "newest": {
        this.displayNotesList = this.totalNotesList;
        this.displayNotesList.sort((a: StudyNote, b: StudyNote)=>{
          return (a.timeCreated > b.timeCreated) ? -1 : (a.timeCreated < b.timeCreated) ? 1 : 0;
        });
        break;
      } case "oldest":{
        this.displayNotesList = this.totalNotesList;
        this.displayNotesList.sort((a: StudyNote, b: StudyNote)=>{
          return (a.timeCreated < b.timeCreated) ? -1 : (a.timeCreated > b.timeCreated) ? 1 : 0;
        });
        break;
      } case "search": {
        for(var i=0; i<this.totalNotesList.length; i++){
          if(this.totalNotesList[i]["title"].toLowerCase().includes(this.searchText.toLowerCase() as string)){
            this.displayNotesList.push(this.totalNotesList[i]);
          }
        }
        break;
      } case "subject": {
        for(var i=0; i<this.totalNotesList.length; i++){
          if(this.totalNotesList[i]["subject"] == this.sortSubject){
            this.displayNotesList.push(this.totalNotesList[i]);
          }
        }
        break;
      } case "tag": {
        for(var i=0; i<this.totalNotesList.length; i++){
          for(var j=0; j<this.categoriesList.length; j++){
            if(this.totalNotesList[i]["categoryList"].includes(this.categoriesList[j])){
              this.displayNotesList.push(this.totalNotesList[i]);
              break;
            }
          }
        }
        break;
      }
    }
  }

  deleteNote(note: StudyNote){
    for(var i=0; i<this.totalNotesList.length; i++){
      if(this.totalNotesList[i] == note){
<<<<<<< Updated upstream
        this.totalNotesList.splice(i, 1);
        this.globalVars.setVar("studyNoteList", JSON.stringify(this.totalNotesList));
        this.updateDisplayNotes();
=======
        if(confirm("Are you sure you want to DELETE this study note?")){
          this.totalNotesList.splice(i, 1);
          this.globalVars.setVar("studyNoteList", JSON.stringify(this.totalNotesList));
          this.updateDisplayNotes();
        }
>>>>>>> Stashed changes
      }
    }
  }
  fullScreenNote(note: Note):void{
    

    let noteElemList = document.getElementsByClassName("note-item-container");
    for(var i=0; i<noteElemList.length; i++){ // If the note container stores the same data as the selected note
      if(noteElemList[i].id == note.timeCreated.toString()){
        noteElemList[i].classList.toggle("fullScreen"); // Full screen the elem
        this.noteIsFullScreen = noteElemList[i].classList.contains("fullScreen")
      }
    }
    // Get every note container obj
    for(var i=0; i<this.displayNotesList.length; i++){
      if(this.displayNotesList[i]['timeCreated'] == note['timeCreated']){
        this.displayNotesList[i]["isFullScreen"] = this.noteIsFullScreen;
      }else{
        this.displayNotesList[i]["isFullScreen"] = false;
      }
    }
    if(this.noteIsFullScreen){
      document.getElementById("background")?.classList.add("dim");
    }else{
      document.getElementById("background")?.classList.remove("dim");
    }
  }

  editNote(note: Note):void{
    // Re-load the stored study notes
    this.totalNotesList = JSON.parse(this.globalVars.getVar("studyNoteList"));
    for(var i=0; i<this.totalNotesList.length; i++){ // Find the index of the note within the locally stored studyNotes
      if(this.totalNotesList[i]['timeCreated'] == note['timeCreated']){
        this.router.navigate(["study_notes/new", i]); // Redirect to edit page
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickHandler(event: MouseEvent){
    if((event.target as HTMLElement).id == "background"){
      let noteElemList = document.getElementsByClassName("note-item-container");
      for(var i=0; i<noteElemList.length; i++){
        this.noteIsFullScreen = false;
        noteElemList[i].classList.remove("fullScreen");
        document.getElementById("background")?.classList.remove("dim");
      }
    }
  }

}
