import { ICreditCard } from './../../structures/credit-card';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { CardIO } from 'ionic-native';


@Component({
  templateUrl: './add-card.page.html',
})
export class AddCardPage {
  public creditCards    : ICreditCard[];
  public creditCardForm : { value: ICreditCard };

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
    this.initFormValidators();
  }

  public scanCard(): void {
    CardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            let options: {} = {
              requireExpiry       : false,
              requireCCV          : false,
              requirePostalCode   : false,
              keepApplicationTheme: true,
              guideColor          : '#00939b',
              scanExpiry          : true,
              suppressConfirmation: true,
              supressManual       : true,
              hideCardIOLogo      : true,
            };
            CardIO.scan(options);
          }
        }
      )
      .catch( (err: Object) => {
        console.error(err);
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

  public logForm(formElem: HTMLFormElement): void {
    console.log(this.creditCardForm.value);
  }

  private initFormValidators(): void {
    this.creditCardForm = this.formBuilder.group({
      number      : ['', Validators.required],
      name        : ['', Validators.required],
      expiryMonth : ['', Validators.required],
      expiryYear  : ['', Validators.required],
      cvc         : ['', Validators.required],
    });
  }

}
