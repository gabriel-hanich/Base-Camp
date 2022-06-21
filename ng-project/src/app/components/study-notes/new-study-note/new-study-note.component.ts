import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Period, StudyNote } from 'src/models';
import { CategoriesListComponent } from '../../ui-components/categories-list/categories-list.component';
import { TextInputComponent } from '../../ui-components/text-input/text-input.component';

@Component({
  selector: 'app-new-study-note',
  templateUrl: './new-study-note.component.html',
  styleUrls: ['./new-study-note.component.scss']
})
export class NewStudyNoteComponent implements OnInit {
  public totalSubjectsList: String[] = [];

  public currentSubject: String = "";
  private categoriesList: String[] = [];
  private currentContent: String = "";
  private noteIndex: number = -1; // Tracks the current index of the note

  @ViewChild(CategoriesListComponent) categoryInput:CategoriesListComponent;
  @ViewChild(TextInputComponent) textInput:TextInputComponent;
  constructor(private globalVars: GlobalVarsService, private router: Router, private route: ActivatedRoute) { }
  
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
    this.currentSubject = this.totalSubjectsList[0];

    // Allow time for page to render before defining categoryInput
    let categoryInput = this.categoryInput;
    let textInput = this.textInput;
    setTimeout(()=>{
      categoryInput = this.categoryInput;
      textInput = this.textInput;
    }, 450)

    this.route.params.subscribe((params)=>{
      if(Object.keys(params).length !== 0 ){
        let currentNote: StudyNote = JSON.parse(this.globalVars.getVar("studyNoteList"))[params['index'] as number];
        console.log(currentNote);
        (document.getElementById("titleInput") as HTMLInputElement).value = currentNote["title"] as string;
        this.currentSubject = currentNote["subject"]; 
        this.noteIndex = params['index'];
        setTimeout(()=>{ // Allow time for page to render before forcing categoryInput to set content
          categoryInput.setTaglist(currentNote["categoryList"]);
          textInput.setContent(currentNote["content"]);
        }, 500)

      }
    });
  }

  updateSubject(subject: String): void{
    this.currentSubject = subject;
  }
  
  updateCategoriesList(value: String[]) {
    this.categoriesList = value;
  }
  updateContent(content: String){
    this.currentContent = content;
  }

  addNote():void{
    let currentTitle = (document.getElementById("titleInput") as HTMLInputElement).value;
    let currentStudyNotes: StudyNote[] = JSON.parse(this.globalVars.getVar("studyNoteList"));
    let thisNote: StudyNote = {
      "title": currentTitle,
      "content": this.currentContent,
      "author": this.globalVars.getVar("userName"),
      "timeCreated": new Date().getTime(),
      "categoryList": this.categoriesList,
      "subject": this.currentSubject
    }
    if(this.noteIndex == -1 || this.noteIndex - 1 > currentStudyNotes.length){
      currentStudyNotes.push(thisNote)
    }else{
      currentStudyNotes[this.noteIndex] = thisNote;
    }

    this.globalVars.setVar("studyNoteList", JSON.stringify(currentStudyNotes));
    setTimeout(()=>{
      this.router.navigate(["study_notes"])
    }, 150)
  }
}
