import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { bucketListService } from '../../app/services/bucketList.service';

//STORAGE AND FORMS
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { File } from '@ionic-native/file';
//import { knownFolders, Folder } from "file-system";
//import { Plugin, pluginWarn } from './plugin';
import { AlertController } from 'ionic-angular';
import { FileEncryption } from '@ionic-native/file-encryption';

//import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
//import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
declare var cordova:any;
var aaa = 'hehe';
@Component({
  selector: 'page-dataentry',
  templateUrl: 'dataentry.html'
})

export class DataEntryPage {
    exists: any;
    random_key: any;
    directoryURL: any;
    showMessage: any;
    formJSON: any;
    theJSON: any;
    theNumbers: any;
    testtxt: any;
    todo = {} //Forms with ngModel
    todoParse: any;
    items: any;
    private fb: FormGroup; //Forms with FormBuilder

    constructor(public navCtrl: NavController, private bucketListService:bucketListService, public params:NavParams, public http: Http, private storage: Storage, private formBuilder: FormBuilder, private file: File, private alertCtrl: AlertController, private fileEncryption: FileEncryption) {


      console.log(this.fileEncryption.encrypt(cordova.file.externalDataDirectory + 'patients/patient_data.txt', 'key'));
      
    }

  ngOnInit(){
    //Create directories
    //Directories are created on home page now
    //this.file.createDir(cordova.file.externalDataDirectory, 'patients', true);
    //this.file.createDir(cordova.file.externalDataDirectory, 'randomization', true);

    //Check if patient_data exists and make it 
    /*
    this.file.checkFile(cordova.file.externalDataDirectory + 'patients/', 'patient_data.txt').then(
      res => true,
      err => false
    ).then(
      isExists => {
        if (isExists) {
          console.log('patient_data.txt already exists, no action necessary!');
        }
        else {
          console.log('patient_data.txt does not exist, creating...');
          this.file.createFile(cordova.file.externalDataDirectory + 'patients/', 'patient_data.txt', true);
        }
      });

      //Check if randomization file exists and make it
      this.file.checkFile(cordova.file.externalDataDirectory + 'randomization/', 'random.txt').then(
        res => true,
        err => false
      ).then(
        isExists => {
          if (isExists) {
            console.log('random.txt already exists, no action necessary!');
          }
          else {
            console.log('random.txt does not exist, creating...');
            //this.file.createFile(cordova.file.externalDataDirectory + 'randomization/', 'random.txt', true);
            this.theNumbers = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
            this.file.writeFile(cordova.file.externalDataDirectory + 'randomization/', 'random.txt', this.theNumbers);
          }
        });
        */

        //console.log(this.fileEncryption.decrypt('assets/json/topSecret.json', 'secretKey'));
        console.log(this.fileEncryption.encrypt(cordova.file.externalDataDirectory + 'patients/patient_data.txt', 'key'));
  }

  

  setData(){
    //Log form results, stringify it, then parse it out to grab individual elements
    console.log(this.todo);
    this.formJSON = JSON.stringify(this.todo);
    this.todoParse = JSON.parse(this.formJSON);
    var patid = this.todoParse.patid;
    var doe = this.todoParse.date;
    var confirm = this.todoParse.confirm;
    var split_keys;
    var patient_data;

    //Due to the asyncronous nature of JS, I was having trouble getting this promise variable to return before we needed it. To circumvent that, we just do all relevant execution inside of the function.
    //It's possible this is poorly optimized and requires a better understanding of promises and responses (see need to read bookmark folder)
    //Read the randomization file and split out the first value
    this.file.readAsText(cordova.file.externalDataDirectory, 'randomization/random.txt').then(response =>{
      //Split all response values by new line
      var split_keys = response.split('\n');
      this.random_key = split_keys[0];
      //Replace our used key with nothing, then trim off the line break
      var new_randomization = response.replace(this.random_key, '');
      var new_randomization_trim = new_randomization.trim();
      //Generate data to plug in to patient_data file
      patient_data = {
        "patid" : patid,
        "random_key" : this.random_key,
        "date_of_enrollment" : doe,
        "confirmation" : confirm,
      }
      var patient_data_json = JSON.stringify(patient_data);
      //Write all information in to patient file on a new line
      this.file.writeFile(cordova.file.externalDataDirectory + 'patients/', 'patient_data.txt', '\n' + patient_data_json, {append:true});
      //Rewrite the randomization file to get rid of the value we just used (is rewriting the entire file too innefficient?)
      this.file.writeExistingFile(cordova.file.externalDataDirectory + 'randomization/', 'random.txt', new_randomization_trim);
    });


    /*
    //If I want to turn checkFile in to its own function (like below), I will need this:
    var path = cordova.file.externalDataDirectory;
    var directory = 'patients';
    var fullpath = path + directory + "/";
    this.checkFile(fullpath, 'abc.txt', 'text');
    */

  }

  setRandomization(){
    this.theNumbers = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    this.file.writeExistingFile(cordova.file.externalDataDirectory + '/randomization', 'random.txt', this.theNumbers);
  }

  checkNextRandom(){
    console.log("check next random");
    this.file.readAsText(cordova.file.externalDataDirectory, 'randomization/random.txt').then(response =>{
      var split_keys = response.split('\n');
      this.random_key = split_keys[0];
      let alert = this.alertCtrl.create({
        title: 'Randomization value',
        message: 'Next randomization value is: ' + this.random_key,
        buttons: [
          {
            text: 'Ok',
            handler: param => {
              return;
            }
          },
        ]
      });
      alert.present();
    });

  }

  readPatientData(){
    this.file.readAsText(cordova.file.externalDataDirectory, 'patients/patient_data.txt').then(response =>{
      var split_keys = response.split('\n');
      this.random_key = split_keys[0];
      let alert = this.alertCtrl.create({
        title: 'patient_data.txt',
        message: response,
        buttons: [
          {
            text: 'Ok',
            handler: param => {
              return;
            }
          },
        ]
      });
      alert.present();
    });
  }


  // checkFile(fullpath: string, fileName: string, text: string) {
  //   try {
  //     this.file.checkFile(fullpath, fileName).then(
  //       res => true,
  //       err => false
  //     ).then(
  //       isExists => {
  //         if (isExists) {
  //           let alert = this.alertCtrl.create({
  //             title: '',
  //             message: 'file exists.',
  //             buttons: [

  //               {
  //                 text: 'cancel',
  //                 handler: param => {
  //                   return;
  //                 }
  //               },
  //               {
  //                 text: 'replace',
  //                 handler: param => {
  //                   this.file.removeFile(fullpath, fileName)
  //                     .then(res => {
  //                       this.writeFile(fullpath, fileName, text, false);
  //                     }).catch(x => {
  //                       // this.showMessage(JSON.stringify(x));
  //                     });
  //                 }
  //               },
  //               {
  //                 text: 'append',
  //                 handler: param => {
  //                   this.writeFile(fullpath, fileName, text, true);
  //                 }
  //               }
  //             ]
  //           });
  //           alert.present();
  //         }
  //         else {
  //           this.writeFile(fullpath, fileName, text, false);
  //         }
  //       });
  //   } catch (x) {
  //     this.showMessage(JSON.stringify(x));
  //   }
  // }

// writeFile(fullpath: string, fileName: string, text: string, append: boolean) {
//     this.file.writeFile(fullpath, fileName, text, { 'append': append })
//       .then(function (result) {
//         // Success!
//         this.showMessage("successfully saved!");
//       }, function (err) {
//         this.showMessage(JSON.stringify(err));
//         // An error occured. Show a message to the user
//       });
//   }




}
