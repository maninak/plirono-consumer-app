import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeeplinkDataProvider } from '../../providers/deeplink-data.provider';



@Component({
  selector:     'page-page1',
  templateUrl:  'page1.html',
  providers:    [DeeplinkDataProvider]
})
export class Page1 {
  amount: number;
  description: string;
  isDeeplingLaunch:boolean = true;

  
  constructor(
      private navCtrl: NavController
      , private deeplinkDataProvider: DeeplinkDataProvider 
    ) {
      setTimeout( () => {
        if (this.isDeeplingLaunch = this.deeplinkDataProvider.init()) {
          this.amount       = this.deeplinkDataProvider.params.amount;
          this.description  = this.deeplinkDataProvider.params.description;
        }
    }, 500);
  }
  
}
