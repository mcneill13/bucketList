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
    var this_vote = 1;
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
    this.displayBar(this.items.option3, this.items.option4, this.items.value1, this.items.value2, this.items.value3, this.items.value4, this_vote);
  }

  putOption2(newValue: number){
    var this_vote = 2;
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
    this.displayBar(this.items.option3, this.items.option4, this.items.value1, this.items.value2, this.items.value3, this.items.value4, this_vote);
  }

  putOption3(newValue: number){
    var this_vote = 3;
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
    this.displayBar(this.items.option3, this.items.option4, this.items.value1, this.items.value2, this.items.value3, this.items.value4, this_vote);
  }

  putOption4(newValue: number){
    var this_vote = 4;
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
    this.displayBar(this.items.option3, this.items.option4, this.items.value1, this.items.value2, this.items.value3, this.items.value4, this_vote);
  }

  displayBar(o3, o4, v1, v2, v3, v4, this_vote){
    //0, 128, 0, 1
    var color_one = 'rgba(34, 34, 34, 1)';
    var color_two = 'rgba(34, 34, 34, 1)';
    var color_three = 'rgba(34, 34, 34, 1)';
    var color_four = 'rgba(34, 34, 34, 1)';
    if(this_vote == 1){
        color_one = 'rgba(0, 128, 0, 1)';
    }
    if(this_vote == 2){
        color_two = 'rgba(0, 128, 0, 1)';
    }
    if(this_vote == 3){
        color_three = 'rgba(0, 128, 0, 1)';
    }
    if(this_vote == 4){
        color_four = 'rgba(0, 128, 0, 1)';
    }

      if(o3 == null){
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["1", "2"],
                datasets: [{
                    label: '# of Votes',
                    data: [v1, v2],
                    backgroundColor: [
                        color_one,
                        color_two,
                    ],
                    borderColor: [
                        'rgba(34, 34, 34, 1)',
                        'rgba(34, 34, 34, 1)',
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
      }else if(o4 == null){
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["1", "2", "3"],
                datasets: [{
                    label: '# of Votes',
                    data: [v1, v2, v3],
                    backgroundColor: [
                        color_one,
                        color_two,
                        color_three,
                    ],
                    borderColor: [
                        'rgba(34, 34, 34, 1)',
                        'rgba(34, 34, 34, 1)',
                        'rgba(34, 34, 34, 1)',
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
      }else{
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["1", "2", "3", "4"],
                datasets: [{
                    label: 'Votes',
                    data: [v1, v2, v3, v4],
                    backgroundColor: [
                        color_one,
                        color_two,
                        color_three,
                        color_four,
                    ],
                    borderColor: [
                        'rgba(34, 34, 34, 1)',
                        'rgba(34, 34, 34, 1)',
                        'rgba(34, 34, 34, 1)',
                        'rgba(34, 34, 34, 1)',
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
      }
      
    
  }

  

}
