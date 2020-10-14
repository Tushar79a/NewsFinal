import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import{ FetchNewsService } from '../fetch-news.service' ;
import { Result } from '../bean/NewsRequest';

@Component({
  selector: 'app-home-graph',
  templateUrl: './home-graph.component.html',
  styleUrls: ['./home-graph.component.css']
})
export class HomeGraphComponent implements OnInit {

  newdData: Result[];
  update: number[]=[];
  id : Array<string>=[];
  lineChartData: ChartDataSets[]=[
    { data: this.update, label: 'Popularity' },
  ];
  lineChartLabels: Label[]=[];
  constructor(private _fetchNewsService : FetchNewsService) { }

  ngOnInit(): void {
    this._fetchNewsService.newsReceived.subscribe(
      (newdData : Result[]) =>{
        let tempUpdate=[];
        let tempId =[];
        if(newdData!=null){
        newdData.forEach(( data )=>{
          tempUpdate.push( data.points );
          tempId.push( data.objectID.toString() );
        });
      }
      this.renderTable(tempUpdate,tempId);
      this.update=tempUpdate;
      this.id=tempId;
      } );
  }

  renderTable(update: Array<number> , id: Array<string>)
  {
    this.lineChartData = [{ data: update, label: 'Id - Votes' }]
    this.lineChartLabels = id;
  }


  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Votes'
        },
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Id'
        },
      }]
    }

  };

  lineChartColors: Color[] = [
    {
      borderColor: 'blue',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}
