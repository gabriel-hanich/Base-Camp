import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @Input() defaultText: String;
  @Output() categoryList: EventEmitter<String[]> = new EventEmitter<String[]>();
  
  public tagList: number[] = []; 
  public tagData: String[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setTaglist(tagList: String[]): void{
    this.tagList = [];
    for(var i=0; i<tagList.length; i++){
      this.tagList.push(i);
    }
    let currentTags: HTMLCollectionOf<Element> = document.getElementsByClassName("categoryTag");
      for(var i=0; i<currentTags.length; i++){
        currentTags[i].textContent = tagList[i] as string
      }
    console.log(this.tagData);
    this.categoryList.emit(this.tagData);
    this.tagData = tagList;
    this.categoryList.emit(this.tagData);
  }

  addTag(){
    this.tagList.push(this.tagList.length);
    setTimeout(()=>{
      let currentTags: HTMLCollectionOf<Element> = document.getElementsByClassName("categoryTag");
      for(var i=0; i<currentTags.length; i++){
        this.tagData[i] = currentTags[i].textContent as string;
      }
      console.log(this.tagData);
      this.categoryList.emit(this.tagData);
    }, 50)
  }
  removeTag(){
    this.tagList.splice(this.tagList.length - 1, 1);
    this.tagData.splice(this.tagData.length - 1, 1);
    this.categoryList.emit(this.tagData);
  }

}
