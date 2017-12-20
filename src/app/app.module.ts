import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


//Modules
//import { IonicStorageModule } from '@ionic/storage';
//import { File } from '@ionic-native/file';
//import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
//import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
//import { FileEncryption } from '@ionic-native/file-encryption';


//pages
import { WhoWouldWinPage } from '../pages/whowouldwin/whowouldwin';
import { WhatDoYouThinkPage } from '../pages/whatdoyouthink/whatdoyouthink';
import { WouldYouBreakUpPage } from '../pages/wouldyoubreakup/wouldyoubreakup';
//import {DataEntryPage} from '../pages/dataentry/dataentry';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoWouldWinPage,
    WhatDoYouThinkPage,
    WouldYouBreakUpPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WhoWouldWinPage,
    WhatDoYouThinkPage,
    WouldYouBreakUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
// @Pipe({name: 'round'})
// export class RoundPipe {
//   transform (input:number) {
//     return Math.floor(input);
//   }
// }