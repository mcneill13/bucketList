import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { RedditService } from '../../app/services/reddit.service';
import { bucketListService } from '../../app/services/bucketList.service';
import { WhoWouldWinPage } from '../whowouldwin/whowouldwin';
import { WhatDoYouThinkPage } from '../whatdoyouthink/whatdoyouthink';
import { WouldYouBreakUpPage } from '../wouldyoubreakup/wouldyoubreakup';
import { DataEntryPage } from '../dataentry/dataentry';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: any;
  highlightedDiv: number;
  disabledButton: number;

  constructor(public navCtrl: NavController, private bucketListService:bucketListService, public params:NavParams, public http: Http) {
    
  }

  ngOnInit(){
    console.log('init ran...');
    //this.getPosts();
  }

  openWhoWouldWin(){
    this.navCtrl.push(WhoWouldWinPage);
  }

  openWhatDoYouThink(){
    this.navCtrl.push(WhatDoYouThinkPage);
  }

  openWouldYouBreakUp(){
    this.navCtrl.push(WouldYouBreakUpPage);
  }

  openDataEntry(){
    this.navCtrl.push(DataEntryPage);
  }

  

  

  // getPosts(){
  //   this.disabledButton = 0;
  //   console.log('getposts ran...');
  //   this.bucketListService.getPosts().subscribe(response => {
  //         //console.log(response);
  //         this.items = response;
  //         //console.log("i can see data here: ", this.items);
  //     });
  // }

  // putSubject1(newValue: number){
  //   if (this.disabledButton === newValue) {
  //     this.disabledButton = 0;
  //   }
  //   else {
  //     this.disabledButton = newValue;
  //   }
  //   console.log('put subject 1');
  //   var old_value1 = Number(this.items.value1);
  //   var new_value1 = old_value1 + 1;

  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   let body = {
  //       id: this.items.id,
  //       value1: new_value1,
  //   };
  //   var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whowouldwin/" + this.items.id;
  //   this.http.put(link, JSON.stringify(body), options)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         //console.log(data);
  //       });
  // }

  // putSubject2(newValue: number){
  //   if (this.disabledButton === newValue) {
  //     this.disabledButton = 0;
  //   }
  //   else {
  //     this.disabledButton = newValue;
  //   }
  //   console.log('put subject 2');
  //   var old_value2 = Number(this.items.value2);
  //   var new_value2 = old_value2 + 1;

  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   let body = {
  //       id: this.items.id,
  //       value2: new_value2,
  //   };
  //   var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whowouldwin/" + this.items.id;
  //   this.http.put(link, JSON.stringify(body), options)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         //console.log(data);
  //       });
  // }

  // viewItem(item){
  //   // this.navCtrl.push(DetailsPage, {
  //   //       item:item
  //   //   });
  // }


  // changeCategory(){
  //   console.log('change cat');
  // }

}
