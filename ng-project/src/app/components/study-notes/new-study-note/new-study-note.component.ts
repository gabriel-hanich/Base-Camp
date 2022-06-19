import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Period, StudyNote } from 'src/models';

@Component({
  selector: 'app-new-study-note',
  templateUrl: './new-study-note.component.html',
  styleUrls: ['./new-study-note.component.scss']
})
export class NewStudyNoteComponent implements OnInit {
  public totalSubjectsList: String[] = [];

  private currentSubject: String = "";
  private categoriesList: String[] = [];
  private currentContent: String = "";

  constructor(private globalVars: GlobalVarsService, private router: Router) { }
  
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
    let currentStudyNotes: StudyNote[] = JSON.parse(this.globalVars.getVar("studyNoteList"));
    let currentTitle = (document.getElementById("titleInput") as HTMLInputElement).value;
    currentStudyNotes.push({
      "title": currentTitle,
      "content": this.currentContent,
      "author": this.globalVars.getVar("userName"),
      "timeCreated": new Date().getTime(),
      "categoryList": this.categoriesList,
      "subject": this.currentSubject
    })
    this.globalVars.setVar("studyNoteList", JSON.stringify(currentStudyNotes));
    setTimeout(()=>{
      this.router.navigate(["study_notes"])
    }, 150)
  }
}
