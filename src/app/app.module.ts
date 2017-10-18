import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { IonicStorageModule } from '@ionic/storage';

//pages
import { WhoWouldWinPage } from '../pages/whowouldwin/whowouldwin';
import { WhatDoYouThinkPage } from '../pages/whatdoyouthink/whatdoyouthink';
import { WouldYouBreakUpPage } from '../pages/wouldyoubreakup/wouldyoubreakup';
import {DataEntryPage} from '../pages/dataentry/dataentry';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WhoWouldWinPage,
    WhatDoYouThinkPage,
    WouldYouBreakUpPage,
    DataEntryPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WhoWouldWinPage,
    WhatDoYouThinkPage,
    WouldYouBreakUpPage,
    DataEntryPage,
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