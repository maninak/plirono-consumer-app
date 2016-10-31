import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
  templateUrl: './add-card.page.html'
})
export class AddCardPage {
  
  constructor(
    private platform        : Platform
    , private navParams     : NavParams
    , private viewController: ViewController
  ) {}

  private dismiss() {
    this.viewController.dismiss();
  }

}
