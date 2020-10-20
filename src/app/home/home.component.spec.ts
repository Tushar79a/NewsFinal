import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FetchNewsService } from '../fetch-news.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [HomeComponent],
      providers: [{ provide: FetchNewsService}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeDefined();
  });

  it('_fetchNewsService check ', () => {
    let _fetchNewsService = fixture.debugElement.injector.get(FetchNewsService);
    _fetchNewsService
      .getNews()
      .subscribe((result) => expect(result.hits.length).toBeGreaterThan(0));
  });

  it('refreshData functionality ', () => {
    component.refreshData(-2);
    expect(component.errorMsg).toEqual("Wrong page");
  });

});
