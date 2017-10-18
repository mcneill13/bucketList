import { Component, Pipe, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { bucketListService } from '../../app/services/bucketList.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-whatdoyouthink',
  templateUrl: 'whatdoyouthink.html'
})

export class WhatDoYouThinkPage {
  items: any;
  highlightedDiv: number;
  disabledButton: number;
  selectedButton: number;
  log: number;
  total: number;
  percent: number;
  percent1: number;
  percent2: number;
  percent3: number;
  percent4: number;
  show: boolean = true;
  test: boolean;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public navCtrl: NavController, private bucketListService:bucketListService, public params:NavParams, public http: Http) {
    //this.item = params.get();
    //this.getPosts();
  }


  ionViewDidLoad() {
    
           this.barChart = new Chart(this.barCanvas.nativeElement, {
    
               type: 'bar',
               data: {
                   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                   datasets: [{
                       label: '# of Votes',
                       data: [12, 19, 3, 5, 2, 3],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(255, 206, 86, 0.2)',
                           'rgba(75, 192, 192, 0.2)',
                           'rgba(153, 102, 255, 0.2)',
                           'rgba(255, 159, 64, 0.2)'
                       ],
                       borderColor: [
                           'rgba(255,99,132,1)',
                           'rgba(54, 162, 235, 1)',
                           'rgba(255, 206, 86, 1)',
                           'rgba(75, 192, 192, 1)',
                           'rgba(153, 102, 255, 1)',
                           'rgba(255, 159, 64, 1)'
                       ],
                       borderWidth: 1
                   }]
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                           }
                       }]
                   }
               }
    
           });
    
           this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    
               type: 'doughnut',
               data: {
                   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                   datasets: [{
                       label: '# of Votes',
                       data: [12, 19, 3, 5, 2, 3],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(255, 206, 86, 0.2)',
                           'rgba(75, 192, 192, 0.2)',
                           'rgba(153, 102, 255, 0.2)',
                           'rgba(255, 159, 64, 0.2)'
                       ],
                       hoverBackgroundColor: [
                           "#FF6384",
                           "#36A2EB",
                           "#FFCE56",
                           "#FF6384",
                           "#36A2EB",
                           "#FFCE56"
                       ]
                   }]
               }
    
           });
    
           this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    
               type: 'line',
               data: {
                   labels: ["January", "February", "March", "April", "May", "June", "July"],
                   datasets: [
                       {
                           label: "My First dataset",
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: "rgba(75,192,192,0.4)",
                           borderColor: "rgba(75,192,192,1)",
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: "rgba(75,192,192,1)",
                           pointBackgroundColor: "#fff",
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: "rgba(75,192,192,1)",
                           pointHoverBorderColor: "rgba(220,220,220,1)",
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: [65, 59, 80, 81, 56, 55, 40],
                           spanGaps: false,
                       }
                   ]
               }
    
           });
    
       }
      

  ngOnInit(){
    console.log('whatdoyouthink init ran...');
    this.getWDYT();
  }

  getWDYT(){
    this.selectedButton = 0;
    this.disabledButton = 0;
    console.log('getWDYT ran...');
    this.bucketListService.getWDYT().subscribe(response => {
          //console.log(response);
          this.items = response;
          console.log("i can see data here: ", this.items);
      });
  }

  changeColor(newValue: number){
    if(this.selectedButton === newValue){
      this.selectedButton = 0;
    }else{
      this.selectedButton = newValue;
    }
    console.log('change color');
  }

  putOption1(newValue: number){
    if (this.disabledButton === newValue) {
      this.disabledButton = 0;
    }
    else {
      this.disabledButton = newValue;
    }
    console.log('put option 1');

    var old_value1 = Number(this.items.value1);
    var new_value1 = old_value1 + 1;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
        id: this.items.id,
        value1: new_value1,
    };
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whatdoyouthink/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value1 = new_value1;
    this.total = Number(this.items.value1) + Number(this.items.value2) + Number(this.items.value3) + Number(this.items.value4);
    this.percent1 = (new_value1 / this.total) * 100;
    this.percent2 = (Number(this.items.value2) / this.total) * 100;
    this.percent3 = (Number(this.items.value3) / this.total) * 100;
    this.percent4 = (Number(this.items.value4) / this.total) * 100;
  }

  putOption2(newValue: number){
    if (this.disabledButton === newValue) {
      this.disabledButton = 0;
    }
    else {
      this.disabledButton = newValue;
    }
    console.log('put option 2');

    var old_value2 = Number(this.items.value2);
    var new_value2 = old_value2 + 1;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
        id: this.items.id,
        value2: new_value2,
    };
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whatdoyouthink/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value2 = new_value2;
    this.total = Number(this.items.value1) + Number(this.items.value2) + Number(this.items.value3) + Number(this.items.value4);
    this.percent1 = (Number(this.items.value1) / this.total) * 100;
    this.percent2 = (new_value2 / this.total) * 100;
    this.percent3 = (Number(this.items.value3) / this.total) * 100;
    this.percent4 = (Number(this.items.value4) / this.total) * 100;
  }

  putOption3(newValue: number){
    if (this.disabledButton === newValue) {
      this.disabledButton = 0;
    }
    else {
      this.disabledButton = newValue;
    }
    console.log('put option 3');

    var old_value3 = Number(this.items.value3);
    var new_value3 = old_value3 + 1;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
        id: this.items.id,
        value3: new_value3,
    };
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whatdoyouthink/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value3 = new_value3;
    this.total = Number(this.items.value1) + Number(this.items.value2) + Number(this.items.value3) + Number(this.items.value4);
    this.percent1 = (Number(this.items.value1) / this.total) * 100;
    this.percent2 = (Number(this.items.value2) / this.total) * 100;
    this.percent3 = (new_value3 / this.total) * 100;
    this.percent4 = (Number(this.items.value4) / this.total) * 100;
  }

  putOption4(newValue: number){
    if (this.disabledButton === newValue) {
      this.disabledButton = 0;
    }
    else {
      this.disabledButton = newValue;
    }
    console.log('put option 4');

    var old_value4 = Number(this.items.value4);
    var new_value4 = old_value4 + 1;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
        id: this.items.id,
        value4: new_value4,
    };
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whatdoyouthink/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value4 = new_value4;
    this.total = Number(this.items.value1) + Number(this.items.value2) + Number(this.items.value3) + Number(this.items.value4);
    
    this.percent1 = (Number(this.items.value1) / this.total) * 100;
    this.percent2 = (Number(this.items.value2) / this.total) * 100;
    this.percent3 = (Number(this.items.value3) / this.total) * 100;
    this.percent4 = (new_value4 / this.total) * 100;
  }

  

}
