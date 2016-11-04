import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavParams, Platform, ViewController } from 'ionic-angular';

import { ICreditCard } from '../../structures/credit-card';


@Component({
  templateUrl: './add-card.page.html',
})
export class AddCardPage {
  public creditCards    : ICreditCard[];
  public creditCardForm : any;

  public constructor(
      private platform      : Platform,
      private navParams     : NavParams,
      private viewController: ViewController,
      private formBuilder   : FormBuilder
  ) {
    if (navParams.get('creditCards')) {
      this.creditCards = navParams.get('creditCards');
    } else {
      this.creditCards = [];
    }
  }

  public ionViewDidLoad(): void {
    this.creditCardForm = this.formBuilder.group({
      number      : ['', Validators.required],
      name        : ['', Validators.required],
      expiryMonth : ['', Validators.required],
      expiryYear  : ['', Validators.required],
      cvc         : ['', Validators.required],
    });
  }

  public addCard(): void {
    // Asserts all form input fields have been validated before being called
    let newCard: ICreditCard = {
      number          : this.creditCardForm.value.number,
      numberLastDigits: this.creditCardForm.value.number.slice(-4),
      name            : this.creditCardForm.value.name,
      expiryMonth     : this.creditCardForm.value.expiryMonth,
      expiryYear      : this.creditCardForm.value.expiryYear,
      cvc             : this.creditCardForm.value.cvc,
    };
    this.creditCards.push(newCard);
    localStorage.setItem('creditCards', JSON.stringify(this.creditCards));
    this.dismiss();
  }

  public dismiss(): void {
    this.viewController.dismiss();
  }

  public logForm(formElem: any): void {
    console.log(this.creditCardForm.value);
  }

}
