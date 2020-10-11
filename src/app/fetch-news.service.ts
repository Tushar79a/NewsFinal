import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsRequest } from './bean/NewsRequest'
import {Result} from './bean/NewsRequest'

@Injectable({
  providedIn: 'root'
})
export class FetchNewsService {
  newsReceived = new EventEmitter<Result[]>();
  private _url: string = "http://hn.algolia.com/api/v1/search?tags=front_page";
  private _skipUrl : string ="http://hn.algolia.com/api/v1/search?&page=";
  constructor(private http:HttpClient) { }

  getNews(): Observable<NewsRequest>{
    return  this.http.get<NewsRequest>( this._url ); 
  }

  SkipPage(page : number ): Observable<NewsRequest>{
    return  this.http.get<NewsRequest>( this._skipUrl+page );
   
  }


}
