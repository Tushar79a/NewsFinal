import { Component, OnInit} from '@angular/core';
import{FetchNewsService} from '../fetch-news.service' 
import {Cache} from '../bean/Cache'
import {Result} from '../bean/NewsRequest'
import { plainToClass } from "class-transformer";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  displayedColumns: string[] = ['Comments', 'Vote Count', 'Up Votes', 'News Details'];
  public news :Result[];
  public errorMsg = "";
  public page = 1;
  public update : number;
  private sessionStorage = window.sessionStorage ;
  public updateArray = [];
  public hideArray = [];
  public isActive : boolean = false;
  public isGraphActive : boolean =  true;

  constructor(private _fetchNewsService : FetchNewsService) { }

  ngOnInit(): void { 
    let currPage = this.sessionStorage.getItem('page');
    if( currPage!=null )
    {
      this.page = Number( currPage );
    }else
    {
      this.page = 1;
    }
    if( this.page==1 ) { 
    this._fetchNewsService.getNews().subscribe( data => {
       this.news = this.fetchdata(data.hits);
       this._fetchNewsService.newsReceived.emit( this.news ) ;
       if( this.news!=null && this.news.length > 0 ) {
        this.isGraphActive = false;
      }
     },
       error => this.errorMsg = error);
    } else{
      this._fetchNewsService.SkipPage( this.page ).subscribe(data => {
        this.news = this.fetchdata( data.hits );
      },
      error => this.errorMsg = error);
    }
    
  }
  // to jump to previous page
  previousPage(currentPage: number) {
    if(this.page>1)
    {
      this.isActive = true;
      this.page = currentPage-1;
      this.sessionStorage.setItem('page',this.page.toString());
      this._fetchNewsService.SkipPage( this.page ).subscribe(data => {
        this.news = this.fetchdata( data.hits );
        this.isActive = false;
      },
      error => this.errorMsg = error);
    }
    
  }
 //to jump to next page
  nextPage(currentPage: number) {
    this.isActive = true;
    this.page = currentPage+1;
    this.sessionStorage.setItem('page',this.page.toString());
    if(this.page!=1)
    {
      this._fetchNewsService.SkipPage( currentPage ).subscribe(data => {
        this.news = this.fetchdata( data.hits );
        this.isActive = false;      
      },
      error => this.errorMsg = error);
    }
    
  }

  //To remove duplicate id
  checkDuplicacy(checkArrays: any[],id :number)
  {
    for (let i=0; i < checkArrays.length; ++i)
     {
      if (checkArrays[i]['id']== id) {
        checkArrays.splice(i, 1); 
      }
    }
  }

  //To hide data
  hideNews(id : number)
  {
    let tempHide = this.sessionStorage.getItem('vote');
    if( tempHide != null )
    {
      this.hideArray  =  JSON.parse( tempHide );
    }
    this.hideArray.push(id);
    this.sessionStorage.setItem('vote',JSON.stringify( this.hideArray ));
    this.fetchdata(this.news);
    this._fetchNewsService.newsReceived.emit( this.news );
    if( this.news.length <= 0 )
    {
      this.nextPage( this.page ) ;
    }
  }

  //To increase count
  updateVotes(count : number, id : number){
    let temp = new Cache();
    temp.id= id;
    temp.value=count+1;
    let cache = this.sessionStorage.getItem('update');
    
    if( cache != null )
    {
      this.updateArray  =  JSON.parse( cache );
      this.checkDuplicacy( this.updateArray,temp.id );
    }
    this.updateArray.push( temp );
    this.sessionStorage.setItem('update',JSON.stringify( this.updateArray ));
    this.fetchdata( this.news );
    this._fetchNewsService.newsReceived.emit( this.news );
  }

  fetchdata(val : Result[])
  {
    let voteCache= this.sessionStorage.getItem('update');
    let hidecache= this.sessionStorage.getItem('vote');

    let temp = plainToClass(Cache,<Cache[]> JSON.parse( voteCache ));
    
    if(temp !=null &&  val !=null )
    {
      for (let i=0; i < temp.length; ++i)
      {
        for (let j=0; j < val.length; ++j)
        {
          if(val[j]['objectID']==temp[i]['id'])
          {
            val[j]['points'] = temp[i]['value'];
          }
        } 
      }
    }
    let hidetemp = plainToClass(Array,<number> JSON.parse(hidecache));
    //for fetch hide data
    
    if( hidetemp !=null &&  val !=null )
    {
      for (let i=0; i < hidetemp.length; ++i)
      {
        for (let j=0; j < val.length; ++j)
        {
          if(val[j]['objectID']==hidetemp[i])
          {
            val.splice(j, 1); 
          }
        } 
      }
    }
    return val;   
  }
}
