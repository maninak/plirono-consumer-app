import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { DeeplinkTransactionPage } from '../pages/deeplink-transaction/deeplink-transaction.page';


@Component({
  templateUrl: './app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DeeplinkTransactionPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Deeplink Transaction Page', component: DeeplinkTransactionPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
