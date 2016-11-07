import { DeeplinkTransactionPage } from './../pages/deeplink-transaction/deeplink-transaction.page';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';


@Component({
  templateUrl: './app.html',
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  public rootPage : Object = DeeplinkTransactionPage;
  public pages    : Array<{title: string, component: Object }>;

  public constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Deeplink Transaction Page', component: DeeplinkTransactionPage },
    ];

  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do all higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  private openPage(page: {title: string, component: Object}): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
