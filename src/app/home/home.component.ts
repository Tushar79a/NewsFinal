import { Component, OnInit } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';
import { Cache } from '../bean/Cache';
import { Result } from '../bean/NewsRequest';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'Comments',
    'Vote Count',
    'Up Votes',
    'News Details',
  ];
  public news: Result[];
  public errorMsg = '';
  public page = 1;
  public update: number;
  private sessionStorage = window.sessionStorage;
  public updateArray = [];
  public hideArray = [];
  public isActive: boolean = false;

  constructor(
    private _fetchNewsService: FetchNewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.page = id;
    });
    this.renderTable();
  }

  renderTable() {
    if (this.page == 1) {
      this._fetchNewsService.getNews().subscribe(
        (data) => {
          this.news = this._fetchNewsService.fetchdata(data.hits);
          this.isActive = false;
        },
        (error) => {
          this.errorMsg = error;
          console.log(this.errorMsg);
        }
      );
    } else {
      this._fetchNewsService.SkipPage(this.page).subscribe(
        (data) => {
          this.news = this._fetchNewsService.fetchdata(data.hits);
          this.isActive = false;
        },
        (error) => {
          this.errorMsg = error;
          console.log(this.errorMsg);
        }
      );
    }
  }

  //To fetch data
  refreshData(pageNo: number)
  {
    if(pageNo>0) {
      this.router.navigate(['../', pageNo], { relativeTo: this.route });
      this.renderTable();
      } else {
        this.errorMsg = "Wrong page"
      }
  }

  // to jump to previous page
  previousPage(currentPage: number) {
    if (this.page > 1) {
      this.isActive = true;
      this.page = currentPage - 1;
      this.refreshData(this.page);

    }
  }
  //to jump to next page
  nextPage(currentPage: number) {
    this.isActive = true;
    this.page = currentPage + 1;
    this.refreshData(this.page);
  }

  //To hide data
  hideNews(id: number) {
    let tempHide = this.sessionStorage.getItem('vote');
    if (tempHide != null) {
      this.hideArray = JSON.parse(tempHide);
    }
    this.hideArray.push(id);
    this.sessionStorage.setItem('vote', JSON.stringify(this.hideArray));
    this._fetchNewsService.fetchdata(this.news);
    if (this.news.length <= 0) {
      this.nextPage(this.page);
    }
  }

  //To increase count
  updateVotes(count: number, id: number) {
    let temp = new Cache();
    temp.id = id;
    temp.value = count + 1;
    let cache = this.sessionStorage.getItem('update');
    if (cache != null) {
      this.updateArray = JSON.parse(cache);
      this._fetchNewsService.checkDuplicacy(this.updateArray, temp.id);
    }
    this.updateArray.push(temp);
    this.sessionStorage.setItem('update', JSON.stringify(this.updateArray));
    this._fetchNewsService.fetchdata(this.news);
  }
}
