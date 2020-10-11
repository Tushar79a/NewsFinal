import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HomeGraphComponent } from './home-graph.component';
import{FetchNewsService} from '../fetch-news.service' ;

describe('HomeGraphComponent', () => {
  let component: HomeGraphComponent;
  let fixture: ComponentFixture<HomeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule], 
      declarations: [ HomeGraphComponent ],
      providers :[
        {provide: FetchNewsService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGraphComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create home-graph component', () => {
    expect(component).toBeDefined();
  });
});
