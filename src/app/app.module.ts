import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AddCardPage } from '../pages/add-card/add-card.page';
import { DeeplinkTransactionPage } from '../pages/deeplink-transaction/deeplink-transaction.page';
import { DeeplinkDataProvider } from '../providers/deeplink-data.provider';
import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    DeeplinkTransactionPage,
    AddCardPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DeeplinkTransactionPage,
    AddCardPage,
  ],
  providers: [DeeplinkDataProvider],
})
export class AppModule {}
