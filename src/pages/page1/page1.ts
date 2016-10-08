import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeeplinkDataProvider } from '../../providers/deeplink-data.provider';



@Component({
  selector:     'page-page1',
  templateUrl:  'page1.html',
  providers:    [DeeplinkDataProvider]
})
export class Page1 implements OnInit {
  amount            : number;
  description       : string;
  merchantId        : string;
  merchantEmail     : string;
  isDeeplinkLaunch  : boolean = false;

  
  constructor(private deeplinkDataProvider: DeeplinkDataProvider) {}


  ngOnInit(){
    this.deeplinkDataProvider.params$.subscribe(
      (params: any) => { this.updateFromSubscription(params); }
    );
  }


  private updateFromSubscription(params:any) {
    this.amount         = params.amount;
    this.description    = params.description;
    this.merchantId     = params.merchantId;
    this.merchantEmail  = params.merchantEmail;
    this.isDeeplinkLaunch = true;
  }


}
