import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsRequest } from './bean/NewsRequest';
import { Result } from './bean/NewsRequest';
import { plainToClass } from 'class-transformer';
import { Cache } from './bean/Cache';

@Injectable({
  providedIn: 'root',
})
export class FetchNewsService {
  newsReceived = new EventEmitter<Result[]>();
  private _url: string = 'https://hn.algolia.com/api/v1/search?tags=front_page';
  private _skipUrl: string = 'https://hn.algolia.com/api/v1/search?&page=';
  private sessionStorage = window.sessionStorage;

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsRequest> {
    return this.http.get<NewsRequest>(this._url);
  }

  SkipPage(page: number): Observable<NewsRequest> {
    return this.http.get<NewsRequest>(this._skipUrl + page);
  }

  //To remove duplicate id
  checkDuplicacy(checkArrays: any[], id: number) {
    for (let i = 0; i < checkArrays.length; ++i) {
      if (checkArrays[i]['id'] == id) {
        checkArrays.splice(i, 1);
      }
    }
  }

  fetchdata(val: Result[]) {
    let voteCache = this.sessionStorage.getItem('update');
    let hidecache = this.sessionStorage.getItem('vote');
    let temp = plainToClass(Cache, <Cache[]>JSON.parse(voteCache));

    if (temp != null && val != null) {
      for (let i = 0; i < temp.length; ++i) {
        for (let j = 0; j < val.length; ++j) {
          if (val[j]['objectID'] == temp[i]['id']) {
            val[j]['points'] = temp[i]['value'];
          }
        }
      }
    }
    let hidetemp = plainToClass(Array, <number>JSON.parse(hidecache));
    //for fetch hide data

    if (hidetemp != null && val != null) {
      for (let i = 0; i < hidetemp.length; ++i) {
        for (let j = 0; j < val.length; ++j) {
          if (val[j]['objectID'] == hidetemp[i]) {
            val.splice(j, 1);
          }
        }
      }
    }
    this.newsReceived.emit(val);
    return val;
  }
}
