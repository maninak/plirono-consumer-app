import { DeeplinkDataProvider } from './../../providers/deeplink-data.provider';
import { ICreditCard } from './../../structures/credit-card';
import { DeeplinkParams } from './../../structures/deeplink-params.class';
import { AddCardPage } from './../add-card/add-card.page';

import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';


@Component({
  templateUrl : './deeplink-transaction.page.html',
  providers   : [DeeplinkDataProvider],
})
export class DeeplinkTransactionPage implements OnInit {
  public creditCards            : ICreditCard[];
  public amount                 : number;
  public description            : string;
  public merchantEmail          : string;
  public merchantId             : string;
  public googleAnalyticsId      : string;
  public cartId                 : string;
  public callbackUrl            : string;
  public isDeeplinkLaunch       : boolean = false;
  public isTransactionProcessed : boolean = false;
  public selectedCard           : string  = '3007';
  public destination            : string  = 'work';

  public constructor(
      private deeplinkDataProvider: DeeplinkDataProvider,
      private platform            : Platform,
      private modalController     : ModalController
  ) {
    this.creditCards = JSON.parse(localStorage.getItem('creditCards'));
  }

  public ngOnInit(): void {
    this.deeplinkDataProvider.params$.subscribe(
      (params: DeeplinkParams) => { this.updateFromSubscription(params); }
    );
  }

  private updateFromSubscription(params: DeeplinkParams): void {
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

  private emitDeeplinkGoogleAnalytics(): void {
    this.platform.ready().then(() => {
      GoogleAnalytics.startTrackerWithId(this.googleAnalyticsId).then( () => {
        GoogleAnalytics.trackEvent('Plirono Button', 'deeplink', 'Pay With Plirono');
      });
    });
  }

  private onCardSelection(): void {
    if (this.selectedCard === '') {
      this.modalController.create(AddCardPage, {
        creditCards : this.creditCards,
      }).present();
    } else {
      this.logCardSelection(); // TODO delete
    }
  }

  private processTransaction(): void {
    this.isTransactionProcessed = true;
  }

  private proceedToCheckout(): void {
    window.open(this.callbackUrl + '/' + this.cartId + '/' + 'aTransactionId', '_system');
  }

  private logCardSelection(): void {
    console.log('Selected card: ' + this.selectedCard);
  }

}
