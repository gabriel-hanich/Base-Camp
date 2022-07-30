import { DOCUMENT } from '@angular/common';
<<<<<<< Updated upstream:Parent-Project/src/app/components/home/home-page/home-page.component.ts
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
=======
<<<<<<< Updated upstream:ng-project/src/app/components/home/home-page/home-page.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { GlobalVarsService } from 'src/app/services/global-vars.service';
=======
import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { KtdGridComponent, KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { debounceTime, filter, fromEvent, merge } from 'rxjs';
import { GlobalVarsService } from 'src/app/services/globals/global-vars.service';
>>>>>>> Stashed changes:Parent-Project/src/app/components/home/home-page/home-page.component.ts
>>>>>>> Stashed changes:ng-project/src/app/components/home/home-page/home-page.component.ts
import { widget } from 'src/models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild(KtdGridComponent) grid: KtdGridComponent;
  public greetingText: string;
  public userName: string = this.globalVars.getVar("userName");
  public timeText: string = "00:00";

  public layout: KtdGridLayout = [];
  public layoutData: widget[] = [];
  public trackById = ktdTrackById;
  public compactType: 'vertical' | 'horizontal' | null = null;

  public newWidgetType = "timetableDay";
  public editableWidgets = false;

<<<<<<< Updated upstream:Parent-Project/src/app/components/home/home-page/home-page.component.ts
  public timeEmitter: EventEmitter<String> = new EventEmitter<String>();

  public colCount: number = Math.round(screen.width / 130);

=======
<<<<<<< Updated upstream:ng-project/src/app/components/home/home-page/home-page.component.ts
=======
  public timeEmitter: EventEmitter<String> = new EventEmitter<String>();

  public colCount: number = Math.round(screen.width / 130);
  resizeSubscription: any;

>>>>>>> Stashed changes:Parent-Project/src/app/components/home/home-page/home-page.component.ts
>>>>>>> Stashed changes:ng-project/src/app/components/home/home-page/home-page.component.ts
  constructor(@Inject(DOCUMENT) public document: Document, private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    try{
      this.layoutData = JSON.parse(this.globalVars.getVar("widgetsLayout"));
    }catch(SyntaxError){
      this.layoutData = [];
    }
    this.updateTime();
<<<<<<< Updated upstream:Parent-Project/src/app/components/home/home-page/home-page.component.ts
=======
<<<<<<< Updated upstream:ng-project/src/app/components/home/home-page/home-page.component.ts
  }, 1000);
=======
>>>>>>> Stashed changes:ng-project/src/app/components/home/home-page/home-page.component.ts
    this.renderBoards();


    const loginTime = new Date();
    if(loginTime.getHours() < 10){
      this.greetingText = "Good Morning"
    }else if(loginTime.getHours() < 15){
      this.greetingText = "Hello"
    }else if(loginTime.getHours() < 18){
      this.greetingText = "Good Afternoon"
    }else{
      this.greetingText = "Good Evening"
    }
    setInterval(()=>{
      this.updateTime();
    }, 1000);
<<<<<<< Updated upstream:Parent-Project/src/app/components/home/home-page/home-page.component.ts
=======

    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    ).pipe(
        debounceTime(50)
    ).subscribe(() => {
        this.grid.resize();
    });
>>>>>>> Stashed changes:Parent-Project/src/app/components/home/home-page/home-page.component.ts
>>>>>>> Stashed changes:ng-project/src/app/components/home/home-page/home-page.component.ts
  }

  updateTime(): void{
    var currentTime: Date = new Date();
      var suffix: string = "am";
      var hours: number = currentTime.getHours()
      if(hours > 12){
        hours -= 12;
        suffix = "pm"
      }
      var minutes: string = currentTime.getMinutes().toString();
      if(minutes.length == 1){
        minutes = "0" + minutes
      }

      this.timeText = hours.toString() + ":" + minutes + suffix;
  }

  renderBoards():void{
    // Convert locally stored layoutData into KtdGridLayout
    console.log("AA")
    var newLayout = [];
    console.log("BB")
    for(var i=0; i<this.layoutData.length; i++){
      let renderBoard = true; // Only render the board if it is new
      for(var k=0; k<newLayout.length; k++){
        if(newLayout[k].id == this.layoutData[i].id.toString()){
          renderBoard = false;
        }
      }
      if(renderBoard){
        console.log(this.layout)
        newLayout.push({
          "id" : this.layoutData[i].id.toString(),
          "x": this.layoutData[i].x,
          "y": this.layoutData[i].y,
          "h": this.layoutData[i].height,
          "w": this.layoutData[i].width,
        });
      }
    }
<<<<<<< Updated upstream:Parent-Project/src/app/components/home/home-page/home-page.component.ts
=======
<<<<<<< Updated upstream:ng-project/src/app/components/home/home-page/home-page.component.ts
    console.log(newLayout);
=======
    this.layout = newLayout
>>>>>>> Stashed changes:Parent-Project/src/app/components/home/home-page/home-page.component.ts
>>>>>>> Stashed changes:ng-project/src/app/components/home/home-page/home-page.component.ts
  }

  addNewWidget():void{
    let lastLayout = this.layoutData[this.layoutData.length - 1];

    let height: number = 6;
    let width: number = 3;

    if(this.newWidgetType === "timeBtn"){
      height = 1;
      width = 1;
    }else if(this.newWidgetType === "note"){
      width = 4;
    }

    if(this.layoutData.length != 0){ // If this ISN'T the first widget on screen
      this.layoutData.push({
        id: (lastLayout.id + 1),
        x: (lastLayout.x + lastLayout.width + 1),
        y: 0,
        height: height,
        width: width,
        presetType: (this.newWidgetType as "timetableDay" | "news" | "note" | "studyNote" | "timeBtn"),
      });
    }else{
      this.layoutData.push({
        id: 0,
        x: 0,
        y: 0,
        height: height,
        width: width,
        presetType: (this.newWidgetType as "timetableDay" | "news" | "note" | "studyNote" | "timeBtn"),
      });
    }
    this.globalVars.setVar("widgetsLayout", JSON.stringify(this.layoutData));
    setTimeout(()=>{
      this.renderBoards();
    }, 100);
  }

  deleteWidget(id: number){
    let newLayout: widget[] = [];
    for(var i=0; i<this.layoutData.length; i++){
      if(this.layoutData[i].id != id){
        newLayout.push(this.layoutData[i])
      }
    }
    this.globalVars.setVar("widgetsLayout", JSON.stringify(newLayout));
    this.layoutData = newLayout;
    setTimeout(()=>{
      this.renderBoards();
    }, 100);
  }

  toggleWidgetEditing():void{
    this.editableWidgets = !this.editableWidgets;
    document.getElementById("adjustContainer")?.classList.toggle('pulledUp');
  }

  saveLayout(currentLayout: KtdGridLayout):void{
    setTimeout(()=>{
      console.log("SAVING LAYOUT")
      for(var i=0; i<currentLayout.length; i++){
        this.layoutData[i].x = currentLayout[i].x;
        this.layoutData[i].y = currentLayout[i].y;
        this.layoutData[i].height = currentLayout[i].h;
        this.layoutData[i].width = this.layout[i].w;
      }
      this.globalVars.setVar("widgetsLayout", JSON.stringify(this.layoutData));
    }, 150)
  }

  toggleTimeDisplay():void{
    this.timeEmitter.emit("Pressed");
  }
}
