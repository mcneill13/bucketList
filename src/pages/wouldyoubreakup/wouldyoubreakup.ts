import { Component, Pipe, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { bucketListService } from '../../app/services/bucketList.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-wouldyoubreakup',
  templateUrl: 'wouldyoubreakup.html'
})

export class WouldYouBreakUpPage {
  items: any;
  highlightedDiv: number;
  disabledButton: number;
  log: number;
  total: number;
  percent1: number;
  percent2: number;
  last: number;
  selectedButton: any;

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  constructor(public navCtrl: NavController, private bucketListService:bucketListService, public params:NavParams, public http: Http) {

  }

  ngOnInit(){
    console.log('wouldyoubreakup init ran...');
    this.getWYBU();
  }

  changeColor(newValue: number){
    if(this.selectedButton === newValue){
      this.selectedButton = 0;
    }else{
      this.selectedButton = newValue;
    }
    console.log('change color');
  }

  getWYBU(){
    this.selectedButton = 0;
    this.disabledButton = 0;
    //this.last = 0;
    console.log('getWYBU ran...');
    this.bucketListService.getWYBU().subscribe(response => {
          this.items = response;
          console.log("i can see data here: ", this.items);
      });

  }

  putSubject1(newValue: number){
    var this_vote = 1;
    if (this.disabledButton === newValue) {
      this.disabledButton = 0;
    }
    else {
      this.disabledButton = newValue;
    }
    console.log('put subject 1');

    var old_value1 = Number(this.items.value1);
    var new_value1 = old_value1 + 1;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
        id: this.items.id,
        value1: new_value1,
    };
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/wouldyoubreakup/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value1 = new_value1;
    this.total = Number(this.items.value1) + Number(this.items.value2);
    this.percent1 = (new_value1 / this.total) * 100;
    this.percent2 = (Number(this.items.value2) / this.total) * 100;
    this.displayBar(this.items.value1, this.items.value2, this_vote);
  }

  putSubject2(newValue: number){
    var this_vote = 2;
    if (this.disabledButton === newValue) {
      this.disabledButton = 0;
    }
    else {
      this.disabledButton = newValue;
    }
    console.log('put subject 2');

    var old_value2 = Number(this.items.value2);
    var new_value2 = old_value2 + 1;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
        id: this.items.id,
        value2: new_value2,
    };
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/wouldyoubreakup/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value2 = new_value2;
    this.total = Number(this.items.value1) + Number(this.items.value2);
    this.percent1 = (Number(this.items.value1) / this.total) * 100;
    this.percent2 = (new_value2 / this.total) * 100;
    this.displayBar(this.items.value1, this.items.value2, this_vote);
  }

  displayBar(v1, v2, this_vote){
    //0, 128, 0, 1
    var color_one = 'rgba(34, 34, 34, 1)';
    var color_two = 'rgba(34, 34, 34, 1)';
    if(this_vote == 1){
        color_one = 'rgba(0, 128, 0, 1)';
    }
    if(this_vote == 2){
        color_two = 'rgba(0, 128, 0, 1)';
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: ["Yes", "No"],
          datasets: [{
              label: 'Votes',
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
  }
}
