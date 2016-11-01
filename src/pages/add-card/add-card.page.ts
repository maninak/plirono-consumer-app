import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

import { CreditCard } from '../../structures/credit-card.interface';


@Component({
  templateUrl: './add-card.page.html'
})
export class AddCardPage {
  creditCards     : CreditCard[];
  formNumber      : string;
  formName        : string;
  formExpiryMonth : number;
  formExpiryYear  : number;
  formCvc         : number;
  
  constructor(
      private platform        : Platform
      , private navParams     : NavParams
      , private viewController: ViewController
  ) {
    if (navParams.get('creditCards')) {
      this.creditCards = navParams.get('creditCards');
    }
    else {
      this.creditCards = [];
    }    
  }

  private addCard() {
    // Asserts all form input fields have been validated before being called
    let newCard: CreditCard = {
      number        : this.formNumber
      , name        : this.formName
      , expiryMonth : this.formExpiryMonth
      , expiryYear  : this.formExpiryYear
      , cvc         : this.formCvc
    };
    this.creditCards.push(newCard);
    localStorage.setItem('creditCards', JSON.stringify(this.creditCards));
    this.dismiss();
  }

  private dismiss() {
    this.viewController.dismiss();
  }

  private logCardForm(formElem: any) {
    console.log(formElem.form.value);
  }

}
