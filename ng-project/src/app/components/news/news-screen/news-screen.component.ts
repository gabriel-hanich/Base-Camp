import { Component, OnInit } from '@angular/core';
import { article } from 'src/app/models';
import { GetNewsDataService } from 'src/app/services/getNewsData/get-news-data.service';
import { GlobalVarsService } from 'src/app/services/global-vars.service';

@Component({
  selector: 'app-news-screen',
  templateUrl: './news-screen.component.html',
  styleUrls: ['./news-screen.component.scss']
})
export class NewsScreenComponent implements OnInit {

  public articleList: article[] = [];

  constructor(private newsData: GetNewsDataService, private globalVars: GlobalVarsService) { }

  ngOnInit(): void {
    this.updateNews();
    setInterval(()=>{
      this.updateNews();
    }, 10000)
  }

  updateNews():void{
    this.newsData.getNewestArticles(this.globalVars.getVar("newsAdress")).then((res)=>{
      for(var i=0; i<res.length; i++){
        if(!this.articleList.map(data => data.headline).includes(res[i]["headline"])){
          this.articleList.push(res[i]);
        }
      }
      this.articleList.sort((d1, d2) => new Date(d2["publishDate"]).getTime() - new Date(d1["publishDate"]).getTime());
      this.articleList = this.articleList.slice(0, 10)
      document.getElementById("loadingWheel")?.classList.add("hide")
    });
  }


}
