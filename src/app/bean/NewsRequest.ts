export  class NewsRequest {
    hits: Result[]
  }
  
 export class Result {

  created_at : string;
  title: string;
  url: string;
  author: string;
  news: string;
  num_comments :number
  public points: number;
  objectID: number;
  isHide :boolean;

  constructor (created_at : string,
  title: string,
  url: string,
  author: string,
  news: string,
  num_comments :number,
  points: number,
  objectID: number,
  isHide :boolean){}
  }
 