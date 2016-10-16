import { Component, OnInit } from '@angular/core';

import { DeeplinkDataProvider } from '../../providers/deeplink-data.provider';


@Component({
  selector:     'page-page1',
  templateUrl:  'page1.html',
  providers:    [DeeplinkDataProvider]
})
export class Page1 implements OnInit {
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

 
  constructor(private deeplinkDataProvider: DeeplinkDataProvider) {}

  ngOnInit(){
    this.deeplinkDataProvider.params$.subscribe(
      (params: any) => { this.updateFromSubscription(params); }
    );
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
  }

  private processTransaction()  { this.isTransactionProcessed = true; }

  private proceedToCheckout()   { window.open(this.callbackUrl+'/'+this.cartId+'/'+'aTransactionId', '_system'); }

}
