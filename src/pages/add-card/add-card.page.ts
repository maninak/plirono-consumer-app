import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Platform, NavParams, ViewController } from 'ionic-angular';

import { CreditCard } from '../../structures/credit-card.interface';


@Component({
  templateUrl: './add-card.page.html'
})
export class AddCardPage {
  creditCards     : CreditCard[];
  creditCardForm  : any;
  formNumberModel : string = '';
  formNumber      : string = '';
  formName        : string;
  formExpiryMonth : number;
  formExpiryYear  : number;
  formCvc         : number;
  
  constructor(
      private platform        : Platform
      , private navParams     : NavParams
      , private viewController: ViewController
      , private formBuilder   : FormBuilder
  ) {
    if (navParams.get('creditCards')) {
      this.creditCards = navParams.get('creditCards');
    }
    else {
      this.creditCards = [];
    }    
  }

  private ionViewDidLoad() {
    this.creditCardForm = this.formBuilder.group({
      number        : ['', Validators.required]
      , name        : ['', Validators.required]
      , expiryMonth : ['', Validators.required]
      , expiryYear  : ['', Validators.required]
      , cvc         : ['', Validators.required]
    });
  }

  private addCard() {
    // Asserts all form input fields have been validated before being called
    let newCard: CreditCard = {
      number        : this.formNumber
      , name        : this.formName
      , expiryMonth : this.formExpiryMonth
      , expiryYear  : this.formExpiryYear
      , cvc         : this.formCvc
      , numberLastDigits: this.formNumber.substr(this.formNumber.length - 4)
    };
    this.creditCards.push(newCard);
    localStorage.setItem('creditCards', JSON.stringify(this.creditCards));
    this.dismiss();
  }

  private _keyPress(event: any) {
    console.log('event: ', event); // TODO delete
    let inputChar = String.fromCharCode(event.charCode || event.which || event.keyCode);
    if (!/[0-9]/.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      this.formNumberModel = (this.formNumber) ? this.formNumber : ' ';
    }
    else {
      // OK, valid input char
      this.formNumber = this.formNumberModel;
    }
    console.log('inputChar: '+inputChar +', this.formNumber: '+this.formNumber); // TODO delete
  }

  private dismiss() {
    this.viewController.dismiss();
  }

  private logForm(formElem: any) {
    console.log(this.creditCardForm.value);
  }

}
