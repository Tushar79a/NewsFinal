export interface NewsRequest {
  hits: Result[];
}

export interface Result {
  created_at: string;
  title: string;
  url: string;
  author: string;
  news: string;
  num_comments: number;
  points: number;
  objectID: number;
  isHide: boolean;
}
