import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class DeeplinkDataProvider {
  private _launchUrl$ : Subject<string>;
  private _url$       : Subject<string>;
  private _params$    : Subject<any>;
  private dataStore: {
    launchUrl         : string
    , url             : string
    , params          : any
  }

  get launchUrl$()    { return this._launchUrl$.asObservable(); }
  get url$()          { return this._url$.asObservable();       }
  get params$()       { return this._params$.asObservable();    }


  constructor(){
    this.dataStore    = { launchUrl: '', url: '', params: {} };
    this._launchUrl$  = <Subject<string>> new Subject();
    this._url$        = <Subject<string>> new Subject();
    this._params$     = <Subject<any>>    new Subject();

    document.addEventListener('deeplink', (event:any) => {
      this.dataStore.launchUrl = event.detail.launchUrl;
      this._launchUrl$.next(this.dataStore.launchUrl);
      this.init();
    });
  }


  private init() {
    let unparsedParams:string;
    let splitToComponentsRegex  = /(.*:\/\/)(.*)\?(.*)/;

    this.dataStore.url          = this.dataStore.launchUrl.replace(splitToComponentsRegex, '$2');
    unparsedParams              = this.dataStore.launchUrl.replace(splitToComponentsRegex, '$3');
    this.dataStore.params       = this.parseUrlParams(unparsedParams);
    
    this._url$.next(this.dataStore.url);
    this._params$.next(this.dataStore.params);
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
