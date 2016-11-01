export interface CreditCard {
  number        : string
  , name        : string
  , expiryMonth : number // format is MM/YY, regex = /([1][0-2]|[0][1-9])\/([0-9][0-9])/
  , expiryYear  : number
  , cvc         : number
};