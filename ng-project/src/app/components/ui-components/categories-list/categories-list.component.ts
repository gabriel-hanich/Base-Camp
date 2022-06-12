import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
import { Note } from 'src/models';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @Input() defaultText: String;
  @Input() id: String;
  @Output() categoryList: EventEmitter<String[]> = new EventEmitter<String[]>();
  public tagList: number[] = []; 
  public tagData: String[] = [];

  public totalTagList: String[] = []; // A list containing all the tags in the system

  constructor(private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    let notesList: Note[] = JSON.parse(this.globalVars.getVar("noteList"));
    
    for(var i=0; i<notesList.length; i++){
      for(var k=0; k<notesList[i]['categoryList'].length; k++){
        if(!this.totalTagList.includes(notesList[i]['categoryList'][k])){
          this.totalTagList.push(notesList[i]['categoryList'][k]);
        }
      }
    }

  }

  setTaglist(tagList: String[]): void{
    this.tagList = [];
    for(var i=0; i<tagList.length; i++){
      this.tagList.push(i);
    }
    setTimeout(()=>{
      let currentTags: Element[]= this.cleanTagList(document.getElementsByClassName("categoryTag"), 'categoryTag');
      for(var i=0; i<currentTags.length; i++){
        currentTags[i].children[0].textContent = tagList[i] as string;
      }
      this.tagData = tagList;
      this.categoryList.emit(this.tagData);
    }, 50)
    
  }

  addTag(doFocus: boolean){
    this.tagList.push(this.tagList.length);
    setTimeout(()=>{
      this.readTagData(doFocus);
    }, 50)
  }
  removeTag(){
    this.tagList.splice(this.tagList.length - 1, 1);
    this.tagData.splice(this.tagData.length - 1, 1);
    this.categoryList.emit(this.tagData);
  }

  readTagData(doFocus: boolean):void{
    let currentTags: Element[] = this.cleanTagList(document.getElementsByClassName("categoryTag"), "categoryTag");
    for(var i=0; i<currentTags.length; i++){
      this.tagData[i] = currentTags[i].textContent as string;
      if(i + 1== currentTags.length && doFocus){
        ((currentTags[i] as HTMLElement).childNodes[0] as HTMLElement).focus();
      }
    }
    this.categoryList.emit(this.tagData);
  }

  @HostListener('document:keydown', ['$event'])
  enterKeyPress(event: KeyboardEvent){
    if(event.key == "Enter"){
      event.preventDefault();
      if(document.activeElement?.classList.contains("categoryText" + this.id)){
        setTimeout(()=>{
          this.addTag(true);
        }, 50)
      }
    }
  }

  private cleanTagList(dirtyList: HTMLCollectionOf<Element>, prefix: String):Element[]{
    // Gets a list of elements and only returns those from this elem
    let cleanList: Element[] = [];
    for(var i=0; i<dirtyList.length; i++){
      if(dirtyList[i].classList.contains(prefix.concat(this.id.toString()))){
        cleanList.push(dirtyList[i]);
      }
    }
    return cleanList;
  }


}
