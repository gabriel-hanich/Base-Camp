import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class GetNewsDataService {

  constructor(private httpClient: HttpClient) { }

  async getNewestArticles(address: string): Promise<Article[]>{
    return new Promise((resolve, reject)=>{
      this.httpClient.get(address).subscribe((data)=>{
        let dataList = data as Article[];
        let newDataList: Article[] = []
        for(var i=0; i<dataList.length; i++){
          newDataList.push(dataList[i])
        }
        resolve(newDataList)
      });
    }); 
  }
}
