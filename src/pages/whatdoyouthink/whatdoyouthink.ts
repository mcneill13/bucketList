import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { RedditService } from '../../app/services/reddit.service';
import { bucketListService } from '../../app/services/bucketList.service';
//import {Pipe} from 'angular/core';


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
