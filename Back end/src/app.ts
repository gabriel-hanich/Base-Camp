const express = require("express");
import Parser from 'rss-parser';
import { article, rssReply } from './models';
const fs = require("fs");
const path = require('path');

let rawOutletData = fs.readFileSync("./outletData.json");
const outlets = JSON.parse(rawOutletData);

const app = express();
const port: number = 3000;


app.use(express.static('../public/index.html'))//set the static path 


type CustomFeed = {foo: string};
const rssParser: Parser<CustomFeed, rssReply[]> = new Parser(); // Used to get rss feed data

async function getArticles(url: string, name: string, imgLink: string): Promise<article[]>{
    return new Promise(async (resolve, reject)=>{
        let res = await rssParser.parseURL(url);
        var articleList: article[] = [];
        // console.log(res)
        await res.items.forEach(rs =>{
            articleList.push({
                "headline": (rs["title"] as string),
                "author": (rs["creator"] as string),
                "imgLink": imgLink,
                "link": (rs["link"] as string),
                "publishDate": new Date(rs["pubDate"] as string),
                "publisher": name});
            // console.log(articleList)
            if(articleList.length === res.items.length){
                resolve(articleList);
            }
        })
    });
}

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get("/newsData", async (req: any, res: any)=>{
    let totalOutletData: article[] = [];
    for(var i=0; i<outlets.length; i++){
        console.log((i + 1)+ "/" + outlets.length)
        let thisOutletData = await getArticles(outlets[i]["RSSLink"], outlets[i]["outletName"], outlets[i]["imgLink"]);
        for(var k=0; k<thisOutletData.length; k++){
            await totalOutletData.push(thisOutletData[k]);
        }
    }
    console.log(totalOutletData.length);
    res.send(totalOutletData);
})


app.use(express.static(path.join(__dirname, '../public')));
 
// all get requests will point to angular's index.html in dist folder
app.get('/*', async (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(port, ()=>{
    console.log("Listening :)")
})
