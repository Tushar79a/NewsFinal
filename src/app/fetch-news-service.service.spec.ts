import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsRequest } from './bean/NewsRequest'
import { FetchNewsService } from './fetch-news.service';

describe('FetchNewsServiceService', () => {
  let service: FetchNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers :[
        {provide: FetchNewsService},
      ]
    })
    .compileComponents();

    service = TestBed.inject(FetchNewsService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should expect a GET call for getNews`, () =>{
      expect(service.getNews()).toBeDefined();
    });

  it(`should handle the negative page `, () =>{
    expect(service.SkipPage(-1)).toBeDefined;
  });

});
