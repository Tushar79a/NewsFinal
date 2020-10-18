import { ComponentFixture, TestBed ,waitForAsync
} from '@angular/core/testing';
import{FetchNewsService} from '../fetch-news.service'
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home.component';
import {NewsRequest, Result} from '../bean/NewsRequest'
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ HomeComponent ],
      providers :[
        {provide: FetchNewsService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeDefined();
  });

  it('checkDuplicacy function test', () => {
    let tempData = [{name : 'abc',id:1},{name : 'abc' ,id:2 },{name : 'abc' ,id:3}];
    component.checkDuplicacy(tempData,3);
    expect(tempData.length).toEqual(2);
  });

  it('_fetchNewsService check ',()=>{
    let _fetchNewsService = fixture.debugElement.injector.get(FetchNewsService);
    _fetchNewsService.getNews().subscribe(result => expect(result.hits.length).toBeGreaterThan(0));

  });

  it('to check negative page ',waitForAsync(()=>{
    let _fetchNewsService = fixture.debugElement.injector.get(FetchNewsService);
    let msg = "";
    _fetchNewsService.SkipPage(-2).subscribe(data => {
      msg = "no error"
    },
    (error) => {
      console.log(error);
      msg = "error";
    },()=>{
      expect(msg).toEqual("error");
    });
  }));

});
