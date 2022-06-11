import { Component, Input, OnInit } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Note } from 'src/models';

@Component({
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.scss']
})
export class NoteWidgetComponent implements OnInit {
  @Input() displaySettings: boolean;

  public showSetting: String = "newest"
  public noteList: Note[] = [];

  public searchNoteName: String;
  public searchNoteCategoryList: String[];

  public displayNoteList: Note[];

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    this.noteList = JSON.parse(this.globalVars.getVar("noteList"));
  }

  updateShowSetting(newSelection: String): void{
    this.showSetting = newSelection;
  }

  updateSearchTitle(searchTitle: String): void{
    this.searchNoteName = searchTitle;
  }

  updateSearchCategory(categoryList: String[]): void{
    this.searchNoteCategoryList = categoryList;
  }

  updateDisplayNote(): void{
    if(this.showSetting == "newest"){
      this.displayNoteList = this.noteList.sort((a, b)=>{
        if(a.timeCreated < b.timeCreated){
          return -1
        }else if(a.timeCreated > b.timeCreated){
          return 1;
        }
        return 0;
      });
    }
  }

}
