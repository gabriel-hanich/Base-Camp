export interface article{
    headline: string;
    author: string;
    imgLink: string;
    publishDate: Date;
    link: string;
    publisher: string;

}

interface period{
    startDate: Date;
    endDate: Date;
    teacher: string;
    classname: string;
    location: SVGStringList;
}
// class periodClass{

//     constructor(datePair, teacher, period, className, location){
//         this.datePair = datePair;
//         this.teacher = teacher;
//         this.period = period;
//         this.className= className;
//         this.className = className;
//         this.location = location

//     }
// }