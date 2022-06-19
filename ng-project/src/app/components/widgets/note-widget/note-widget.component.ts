import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Note, widget } from 'src/models';
import { CategoriesListComponent } from '../../ui-components/categories-list/categories-list.component';

@Component({
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.scss']
})
export class NoteWidgetComponent implements OnInit {
  @Input() displaySettings: boolean;
  @Input() id: number;

  public showSetting: String = "newest"
  public noteList: Note[] = [];

  public searchNoteName: String;
  public searchNoteCategoryList: String[] = [];

  public displayNoteList: Note[];

  private additionalData: Map<String, String>;
  private widget: widget;
  private widgetIndex: number;
  constructor(private globalVars: GlobalVarsService) { }

  @ViewChild(CategoriesListComponent) categoryInput:CategoriesListComponent;

  ngOnInit(): void {
    this.noteList = JSON.parse(this.globalVars.getVar("noteList"));
    this.searchNoteName = this.noteList[0]['title'];
    // Load additional data
    let storedWidgets: widget[] = JSON.parse(this.globalVars.getVar("widgetsLayout"));
    for(var i=0; i<storedWidgets.length; i++){
      if(storedWidgets[i]["id"] == this.id){
        this.widget= storedWidgets[i];
        this.widgetIndex = i;
      }
    }
    if(this.widget.additionalData){
      this.additionalData = new Map<String, String>(JSON.parse(this.widget.additionalData as string));

      this.showSetting = this.additionalData.get("showSetting") as String;
      this.searchNoteName = this.additionalData.get("searchNoteName") as String;
      this.searchNoteCategoryList = JSON.parse(this.additionalData.get("searchNoteCategoryList") as string);
      setTimeout(()=>{
        if(this.categoryInput){
          this.categoryInput.setTaglist(this.searchNoteCategoryList);
        }
      }, 50)

    }else{
      this.additionalData = new Map<String, String>();
      this.additionalData.set("showSetting", this.showSetting);
      this.additionalData.set("searchNoteName", this.searchNoteName);
      this.additionalData.set("searchNoteCategoryList", JSON.stringify(this.searchNoteCategoryList));
    }
    if(this.categoryInput){
      this.categoryInput.setTaglist(this.searchNoteCategoryList);
    }
    this.updateDisplayNote();
  }

  saveSettings(): void{
    let totalWidgetData: widget[] = JSON.parse(this.globalVars.getVar("widgetsLayout"));
    this.widget.additionalData = JSON.stringify(Array.from(this.additionalData.entries()));
    totalWidgetData[this.widgetIndex] = this.widget;

    this.globalVars.setVar("widgetsLayout", JSON.stringify(totalWidgetData));
  }

  updateShowSetting(newSelection: String): void{
    this.showSetting = newSelection;
    this.additionalData.set("showSetting", newSelection);
    this.updateDisplayNote();
  }
  
  updateSearchTitle(searchTitle: String): void{ 
    this.searchNoteName = searchTitle;
    this.additionalData.set("searchNoteName", searchTitle);
    this.updateDisplayNote();
  }
  
  updateSearchCategory(categoryList: String[]): void{
    this.searchNoteCategoryList = categoryList;
    console.log("UPDATE");
    this.updateDisplayNote();
    this.additionalData.set("searchNoteCategoryList", JSON.stringify(categoryList));
  }

  updateDisplayNote(): void{
    this.displayNoteList = [];
    if(this.showSetting == "newest"){
      this.displayNoteList = [this.noteList.sort((a, b)=>{
        if(a.timeCreated < b.timeCreated){
          return 1;
        }else if(a.timeCreated > b.timeCreated){
          return -1;
        }
        return 0;
      })[0]];
    }else if(this.showSetting == "set"){
      console.log(this.searchNoteName);
      for(var i=0; i<this.noteList.length; i++){
        if(this.noteList[i]["title"] == this.searchNoteName){
          this.displayNoteList = [this.noteList[i]];
        }
      }
    }else if(this.showSetting == "tag"){
      for(var i=0; i<this.noteList.length; i++){
        let display: boolean = false;
        for(var k=0; k<this.searchNoteCategoryList.length; k++){
          if(this.noteList[i]['categoryList'].includes(this.searchNoteCategoryList[k])){
            display = true;
          }
        }
        if(display){ // Only add the note to the list of at least one of the search tags is present
          this.displayNoteList.push(this.noteList[i]);
        }
      }
    }else if(this.showSetting == "random"){
      this.displayNoteList = [this.noteList[this.getRandomInt(this.noteList.length)]];
    }
    this.saveSettings();
  }
  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
