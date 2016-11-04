import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { DeeplinkTransactionPage } from '../pages/deeplink-transaction/deeplink-transaction.page';


@Component({
  templateUrl: './app.html',
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  public rootPage : any = DeeplinkTransactionPage;
  public pages    : Array<{title: string, component: any}>;

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
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  private openPage(page: {title: string, component: any}): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
