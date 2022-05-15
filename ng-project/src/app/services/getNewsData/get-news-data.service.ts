import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { article } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class GetNewsDataService {

  constructor(private httpClient: HttpClient) { }

  async getNewestArticles(): Promise<article[]>{
    return new Promise((resolve, reject)=>{
      this.httpClient.get("http://localhost:3000").subscribe((data)=>{
        let dataList = data as article[];
        let newDataList: article[] = []
        for(var i=0; i<dataList.length; i++){
          newDataList.push(dataList[i])
        }
        resolve(newDataList)
      });
    }); 
  }
}
