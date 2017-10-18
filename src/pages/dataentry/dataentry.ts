import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { bucketListService } from '../../app/services/bucketList.service';


//STORAGE AND FORMS
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-dataentry',
  templateUrl: 'dataentry.html'
})

export class DataEntryPage {
    private todo : FormGroup;

    constructor(public navCtrl: NavController, private bucketListService:bucketListService, public params:NavParams, public http: Http, private storage: Storage, private formBuilder: FormBuilder) {
        //this.item = params.get();
        //this.getPosts();
        storage.set('name', 'Max');
        storage.set('age', '55');

        storage.get('age').then((val) => {
        console.log('Your age is', val);
        });

        this.todo = this.formBuilder.group({
        title: ['', Validators.required],
        description: [''],
        });
    }

  ngOnInit(){
    console.log('data entry page');
  }
  
  logForm(){
    console.log(this.todo.value.title);
  }

  setData(){
    console.log("set data");
    this.storage.set('myData', this.todo.value.title);
  }
  
  getData(){
    console.log("get data");
    // this.storage.get('myData', (data) => {
    //   console.log(data);
    // });
    this.storage.get('myData').then((data) => {
      console.log(data);
    });
  }


}
