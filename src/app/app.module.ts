/// <reference path="../../typings/index.d.ts" />
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { DeeplinkTransactionPage } from '../pages/deeplink-transaction/deeplink-transaction.page';
import { AddCardPage } from '../pages/add-card/add-card.page';

import { DeeplinkDataProvider } from '../providers/deeplink-data.provider';


@NgModule({
  declarations: [
    MyApp
    , DeeplinkTransactionPage
    , AddCardPage
  ]
  , imports: [
    IonicModule.forRoot(MyApp)
  ]
  , bootstrap: [IonicApp]
  , entryComponents: [
    MyApp
    , DeeplinkTransactionPage
    , AddCardPage
  ]
  , providers: [DeeplinkDataProvider]
})
export class AppModule {}
