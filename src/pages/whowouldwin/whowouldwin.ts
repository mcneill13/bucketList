import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { RedditService } from '../../app/services/reddit.service';
import { bucketListService } from '../../app/services/bucketList.service';
//import {Pipe} from 'angular/core';


@Component({
  selector: 'page-whowouldwin',
  templateUrl: 'whowouldwin.html'
})

export class WhoWouldWinPage {
  items: any;
  highlightedDiv: number;
  disabledButton: number;
  log: number;
  total: number;
  percent1: number;
  percent2: number;

  constructor(public navCtrl: NavController, private bucketListService:bucketListService, public params:NavParams, public http: Http) {
    //this.item = params.get();
    //this.getPosts();
  }


//   logRadio(element: HTMLInputElement): void{
//         //this.log += `Radio ${element.value} was selected\n`
//         this.log = 'major boners';
//   }

  //getSubject1

  ngOnInit(){
    console.log('whowouldwin init ran...');
    this.getPosts();
  }

  getPosts(){
    this.disabledButton = 0;
    console.log('getposts ran...');
    this.bucketListService.getPosts().subscribe(response => {
          //console.log(response);
          this.items = response;
          //console.log("i can see data here: ", this.items);
      });
  }

//   getUpdatedPosts(){
//     this.disabledButton = 0;
//     console.log('getUpdatedPosts ran...');
//     this.bucketListService.getPosts().subscribe(response => {
//           //console.log(response);
//           this.items = response;
//           //console.log("i can see data here: ", this.items);
//       });
//   }

  putSubject1(newValue: number){
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
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whowouldwin/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value1 = new_value1;
    this.total = Number(this.items.value1) + Number(this.items.value2);
    this.percent1 = (new_value1 / this.total) * 100;
    this.percent2 = 100 - this.percent1;
  }

  putSubject2(newValue: number){
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
    var link = "http://dev-mcneill13d7.pantheonsite.io/myrestapi/whowouldwin/" + this.items.id;
    this.http.put(link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
        });
    this.items.value2 = new_value2;
    this.total = Number(this.items.value1) + Number(this.items.value2);
    this.percent2 = (new_value2 / this.total) * 100;
    this.percent1 = 100 - this.percent2;
  }

}
