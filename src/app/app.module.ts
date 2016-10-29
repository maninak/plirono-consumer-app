import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { DeeplinkTransactionPage } from '../pages/deeplink-transaction/deeplink-transaction.page';

import { DeeplinkDataProvider } from '../providers/deeplink-data.provider';


@NgModule({
  declarations: [
    MyApp,
    DeeplinkTransactionPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DeeplinkTransactionPage
  ],
  providers: [DeeplinkDataProvider]
})
export class AppModule {}
