import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Response } from '@angular/http';
//import { Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs';
import 'rxjs/Rx';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class bucketListService{
    http:any;
    baseUrl: String;
    WDYTURL: String;
    WYBUURL: String; 
    //posturl = "http://dev-mcneill13d7.pantheonsite.io/note/note";
    data:any;

    constructor(http:Http){
        
        this.http = http;
        this.baseUrl = 'http://dev-mcneill13d7.pantheonsite.io/random/question';
        this.WDYTURL = 'http://dev-mcneill13d7.pantheonsite.io/random/wdyt';
        this.WYBUURL = 'http://dev-mcneill13d7.pantheonsite.io/random/wybu';
        //this.baseUrl = 'http://dev-mcneill13d7.pantheonsite.io/myrestapi/views/list_of_content/';
        //this.postData.subject = 'test123';
        this.data={};
        this.data.subject='test123';
        this.data.user='1';
        this.data.note='zzzzz';
        this.data.response='';
    }

    //should this take IN URL parameters for question / people/ etc?
    getPosts(){
        return this.http.get(this.baseUrl)
            .map(res => res.json());
    }

    getWDYT(){
        return this.http.get(this.WDYTURL)
            .map(res => res.json());
    }

    getWYBU(){
        return this.http.get(this.WYBUURL)
            .map(res => res.json());
    }

    // postData(){
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let body = {
    //         subject: "bananas",
    //         uid: 1,
    //         note: "super bananas"
    //     };
    //     console.log('post something happened');
    //     var link = "http://dev-mcneill13d7.pantheonsite.io/note/note";
    //     this.http.post(link, JSON.stringify(body), {headers: headers})
    //         .map(res => res.json())
    //         .subscribe(data => {
    //             console.log(data);
    //         });
    // }





}