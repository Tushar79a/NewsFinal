import { ComponentFixture, TestBed } from '@angular/core/testing';
import{FetchNewsService} from '../fetch-news.service' 
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home.component';

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

});
