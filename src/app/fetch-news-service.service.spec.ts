import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsRequest } from './bean/NewsRequest';
import { FetchNewsService } from './fetch-news.service';

describe('FetchNewsServiceService', () => {
  let service: FetchNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: FetchNewsService }],
    }).compileComponents();

    service = TestBed.inject(FetchNewsService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should expect a GET call for getNews`, () => {
    expect(service.getNews()).toBeDefined();
  });

  it(`should handle the negative page `, () => {
    expect(service.SkipPage(-1)).toBeDefined;
  });

  it('checkDuplicacy function test', () => {
    let tempData = [
      { name: 'abc', id: 1 },
      { name: 'abc', id: 2 },
      { name: 'abc', id: 3 },
    ];
    service.checkDuplicacy(tempData, 3);
    expect(tempData.length).toEqual(2);
  });

  it('fetchdata function test', () => {
    let tempData = [];
    let fakeResponse = service.fetchdata(tempData);
    expect(fakeResponse).toBeNaN;
  });
});
