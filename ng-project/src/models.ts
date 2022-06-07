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

export interface widget{
    id: number;
    x: number;
    y: number;
    height: number;
    width: number;
    presetType: "timetableDay" | "news" | "note" | "studyNote";
    additionalData?: String;
}

export interface Note{
    title: String;
    content: String;
    isArchived: Boolean;
    timeCreated: number;
}