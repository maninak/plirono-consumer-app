import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';

import { DeeplinkDataProvider } from '../providers/deeplink-data.provider';



@NgModule({
  declarations: [
    MyApp,
    Page1
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1
  ],
  providers: [DeeplinkDataProvider]
})
export class AppModule {}
