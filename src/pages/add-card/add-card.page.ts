import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { CardIO } from 'ionic-native';

import { CreditCard } from '../../structures/credit-card.interface';


@Component({
  templateUrl: './add-card.page.html'
})
export class AddCardPage {
  creditCards     : CreditCard[];
  creditCardForm  : any;
  
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

  private scanCard() {
    CardIO.canScan()
      .then(
        (res: boolean) => {
          if (res){
            let options = {
              requireExpiry         : false
              , requireCCV          : false
              , requirePostalCode   : false
              , keepApplicationTheme: true
              , guideColor          : '#00939b'
              , scanExpiry          : true
              , suppressConfirmation: true
              , supressManual       : true
              , hideCardIOLogo      : true
            };
            CardIO.scan(options);
          }
        }
      )
      .catch( (err: any) => {
        console.error(err);
      });
  }

  private addCard() {
    // Asserts all form input fields have been validated before being called
    let newCard: CreditCard = {
      number            : this.creditCardForm.value.number
      , numberLastDigits: this.creditCardForm.value.number.slice(-4)
      , name            : this.creditCardForm.value.name
      , expiryMonth     : this.creditCardForm.value.expiryMonth
      , expiryYear      : this.creditCardForm.value.expiryYear
      , cvc             : this.creditCardForm.value.cvc
    };
    this.creditCards.push(newCard);
    localStorage.setItem('creditCards', JSON.stringify(this.creditCards));
    this.dismiss();
  }

  private _keyPress(event: any) {
    console.log('event: ', event); // TODO delete
  }

  private dismiss() {
    this.viewController.dismiss();
  }

  private logForm(formElem: any) {
    console.log(this.creditCardForm.value);
  }

}
