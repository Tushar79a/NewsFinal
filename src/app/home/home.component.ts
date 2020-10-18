import { Component, OnInit } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';
import { Cache } from '../bean/Cache';
import { Result } from '../bean/NewsRequest';

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

  constructor(private _fetchNewsService: FetchNewsService) {}

  ngOnInit(): void {
    let currPage = this.sessionStorage.getItem('page');
    if (currPage != null) {
      this.page = Number(currPage);
    } else {
      this.page = 1;
    }
    if (this.page == 1) {
      this._fetchNewsService.getNews().subscribe(
        (data) => {
          this.news = this._fetchNewsService.fetchdata(data.hits);
        },
        (error) => (this.errorMsg = error)
      );
    } else {
      this._fetchNewsService.SkipPage(this.page).subscribe(
        (data) => {
          this.news = this._fetchNewsService.fetchdata(data.hits);
        },
        (error) => (this.errorMsg = error)
      );
    }
  }

  // to jump to previous page
  previousPage(currentPage: number) {
    if (this.page > 1) {
      this.isActive = true;
      this.page = currentPage - 1;
      this.sessionStorage.setItem('page', this.page.toString());
      if (this.page == 1) {
        this._fetchNewsService.getNews().subscribe(
          (data) => {
            this.news = this._fetchNewsService.fetchdata(data.hits);
            this._fetchNewsService.newsReceived.emit(this.news);
            this.isActive = false;
          },
          (error) => (this.errorMsg = error)
        );
      } else {
        this._fetchNewsService.SkipPage(this.page).subscribe(
          (data) => {
            this.news = this._fetchNewsService.fetchdata(data.hits);
            this.isActive = false;
          },
          (error) => (this.errorMsg = error)
        );
      }
    }
  }
  //to jump to next page
  nextPage(currentPage: number) {
    this.isActive = true;
    this.page = currentPage + 1;
    this.sessionStorage.setItem('page', this.page.toString());
    if (this.page != 1) {
      this._fetchNewsService.SkipPage(this.page).subscribe(
        (data) => {
          this.news = this._fetchNewsService.fetchdata(data.hits);
          this.isActive = false;
        },
        (error) => (this.errorMsg = error)
      );
    }
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
