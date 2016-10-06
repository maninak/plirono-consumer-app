import { Injectable } from '@angular/core';

@Injectable()
export class DeeplinkDataProvider {
  launchUrl:string;
  url:string;
  params:any  = {};

  constructor(){}

  init() {
    if (localStorage.getItem('launchUrl')) {
      this.launchUrl = localStorage.getItem('launchUrl');
      localStorage.removeItem('launchUrl');
    }
    else {
      console.warn("DeeplinkDataProvider was not initilised. Application wasn't launched via deeplink procedure.");
      return;
    }
    let splitToComponentsRegex  = /(.*:\/\/)(.*)\?(.*)/;
    let urlScheme               = this.launchUrl.replace(splitToComponentsRegex, '$1'); 
    let unparsedParams:string; 
    if (urlScheme === 'tinaba://'){ // TODO load scheme from a .env file
      this.url        = this.launchUrl.replace(splitToComponentsRegex, '$2');
      unparsedParams  = this.launchUrl.replace(splitToComponentsRegex, '$3');
      this.params     = this.parseUrlParams(unparsedParams);
    }
  }

  private parseUrlParams(unparsedParams:string) {
    var parsedParams = {};
    unparsedParams.split("&").forEach(function(part) {
      var item = part.split("=");
      parsedParams[item[0]] = decodeURIComponent(item[1]);
    });
    return parsedParams;
  }
}
