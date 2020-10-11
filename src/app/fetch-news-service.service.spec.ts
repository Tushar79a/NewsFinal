import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

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
});
