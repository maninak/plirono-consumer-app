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
   
  constructor(
      private navCtrl: NavController
      , private deeplinkDataProvider: DeeplinkDataProvider 
    ) {
      this.deeplinkDataProvider.init()
      setTimeout( () => {
        this.amount = this.deeplinkDataProvider.params.amount;
        console.log('LaunchUrl = '+this.deeplinkDataProvider.launchUrl); // TODO delete
        console.log(this.deeplinkDataProvider.params); // TODO delete
    }, 1000);
  }
  
}
