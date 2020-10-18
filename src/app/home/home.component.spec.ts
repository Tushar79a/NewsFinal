import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FetchNewsService } from '../fetch-news.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      providers: [{ provide: FetchNewsService }],
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

  it(
    'to check negative page ',
    waitForAsync(() => {
      let _fetchNewsService = fixture.debugElement.injector.get(
        FetchNewsService
      );
      let msg = '';
      _fetchNewsService.SkipPage(-2).subscribe(
        (data) => {
          msg = 'no error';
        },
        (error) => {
          console.log(error);
          msg = 'error';
        }
      );

      fixture.whenStable().then(() => {
        expect(msg).toEqual('error');
      });
    })
  );
});
