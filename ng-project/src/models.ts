export interface Article{
    headline: string;
    author: string;
    imgLink: string;
    publishDate: Date;
    link: string;
    publisher: string;

}

export interface Period{
    startDate: Date;
    endDate: Date;
    teacher: string;
    period: string;
    classname: string;
    location: string;
    isCurrent?: boolean;
}