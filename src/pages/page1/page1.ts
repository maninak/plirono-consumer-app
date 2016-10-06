import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector:     'page-page1',
  templateUrl:  'page1.html'
})
export class Page1 {
  amount:       number = 0;
  description:  string = '';

  constructor(public navCtrl: NavController) {
    console.log('LaunchUrl = '+localStorage.getItem('launchUrl'));
  }

}
