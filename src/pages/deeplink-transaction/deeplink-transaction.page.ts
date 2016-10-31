import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

import { CreditCard } from '../../structures/credit-card.interface';
import { AddCardPage } from '../add-card/add-card.page';
import { DeeplinkDataProvider } from '../../providers/deeplink-data.provider';


@Component({
  templateUrl : './deeplink-transaction.page.html',
  providers   : [DeeplinkDataProvider]
})
export class DeeplinkTransactionPage implements OnInit {
  creditCards             : CreditCard[];
  amount                  : number;
  description             : string;
  merchantEmail           : string;
  merchantId              : string;
  googleAnalyticsId       : string;
  cartId                  : string;
  callbackUrl             : string;
  isDeeplinkLaunch        : boolean = false;
  isTransactionProcessed  : boolean = false;
  selectedCard            : string;
  destination             : string;
 
  constructor(
      private deeplinkDataProvider: DeeplinkDataProvider
      , private platform          : Platform
      , private modalController   : ModalController
  ) {
    this.creditCards = JSON.parse(localStorage.getItem('creditCards'));
    console.log(this.creditCards); // TODO delete
  }

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
    this.emitDeeplinkGoogleAnalytics();
  }

  private emitDeeplinkGoogleAnalytics() {
    this.platform.ready().then(() => {
      GoogleAnalytics.startTrackerWithId(this.googleAnalyticsId).then( () => {
        GoogleAnalytics.trackEvent('Plirono Button', 'deeplink', 'Pay With Plirono');
      });
    });
  }

  private onCardSelection() {
    if (this.selectedCard === "") {
      this.modalController.create(AddCardPage, {
        'creditCards' : this.creditCards
      })
      .present();
    }
    else {
      this.logCardSelection();
    }
  }

  private processTransaction() {
    this.isTransactionProcessed = true;
  }

  private proceedToCheckout() {
    window.open(this.callbackUrl+'/'+this.cartId+'/'+'aTransactionId', '_system');
  }

  private logCardSelection(){
    console.log("Selected card: " + this.selectedCard);
  }

}
