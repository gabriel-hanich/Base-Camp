export interface article{
    headline: string;
    author: string;
    imgLink: string;
    publishDate: Date;
    link: string;
    publisher: string;
}


export interface rssReply{
    title:string,
    description: string,
    creator: string,
    isoDate: string,
    isLegacy: boolean,
    link: string,
    content: string,
    contentSnippet: string,
    categories: string[]
}