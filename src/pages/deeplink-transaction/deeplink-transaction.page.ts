import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { DeeplinkDataProvider } from '../../providers/deeplink-data.provider';


@Component({
  templateUrl:  './deeplink-transaction.page.html',
  providers:    [DeeplinkDataProvider]
})
export class DeeplinkTransactionPage implements OnInit {
  amount                  : number;
  description             : string;
  merchantEmail           : string;
  merchantId              : string;
  googleAnalyticsId       : string;
  cartId                  : string;
  callbackUrl             : string;
  isDeeplinkLaunch        : boolean = false;
  isTransactionProcessed  : boolean = false;
  creditCard              : string;
  destination             : string;
  formNumber              : string;
  formName                : string;
  formExpiry              : string;
  formCvc                 : string;
 
  constructor(
      private deeplinkDataProvider: DeeplinkDataProvider
      , private platform          : Platform
  ) {}

  ngOnInit(){
    this.deeplinkDataProvider.params$.subscribe(
      (params: any) => { this.updateFromSubscription(params); }
    );
  }

  private logForm(formElem: any) { // TODO delete
    console.log(formElem.form.value);
  }

  private updateFromSubscription(params: any) {
    this.amount             = params.amount;
    this.description        = params.description;
    this.merchantEmail      = params.merchantEmail;
    this.merchantId         = params.merchantId;
    this.googleAnalyticsId  = params.googleAnalyticsId;
    this.cartId             = params.cartId;
    this.callbackUrl        = params.callbackUrl;
    this.isDeeplinkLaunch   = true;
    this.emitDeeplinkGoogleAnalytics();
  }

  private emitDeeplinkGoogleAnalytics() {
    this.platform.ready().then(() => {
      GoogleAnalytics.startTrackerWithId(this.googleAnalyticsId).then( () => {
        GoogleAnalytics.trackEvent('Plirono Button', 'deeplink', 'Pay With Plirono');
      });
    });
  }

  private processTransaction()  { this.isTransactionProcessed = true; }

  private proceedToCheckout()   { window.open(this.callbackUrl+'/'+this.cartId+'/'+'aTransactionId', '_system'); }

}
