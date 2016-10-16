import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject    } from 'rxjs/Subject';



@Injectable()
export class DeeplinkDataProvider {
  private _deeplinkUrl$ : Subject<string>;
  private _path$        : Subject<string>;
  private _params$      : Subject<any>;
  private dataStore     : {
    deeplinkUrl : string
    , path      : string
    , params    : any
  }

  get deeplinkUrl$()  { return this._deeplinkUrl$.asObservable(); }
  get path$()         { return this._path$.asObservable();        }
  get params$()       { return this._params$.asObservable();      }


  constructor(){
    this.dataStore      = { deeplinkUrl: '', path: '', params: {} };
    this._deeplinkUrl$  = <Subject<string>> new Subject();
    this._path$         = <Subject<string>> new Subject();
    this._params$       = <Subject<any>>    new Subject();

    document.addEventListener('deeplink', (event:any) => {
      this.dataStore.deeplinkUrl = event.detail.launchUrl;
      this._deeplinkUrl$.next(this.dataStore.deeplinkUrl);
      this.init();
    });
  }


  private init() {
    let unparsedParams: string;
    let splitToComponentsRegex  = /(.*):\/(\/.*)\?(.*)/;

    this.dataStore.path         = this.dataStore.deeplinkUrl.replace(splitToComponentsRegex, '$2');
    unparsedParams              = this.dataStore.deeplinkUrl.replace(splitToComponentsRegex, '$3');
    this.dataStore.params       = this.parseUrlParams(unparsedParams);
    
    this._path$.next(this.dataStore.path);
    this._params$.next(this.dataStore.params);
  }


  private parseUrlParams(unparsedParams: string): any {
    var parsedParams = {};
    unparsedParams.split("&").forEach(function(part) {
      var item = part.split("=");
      parsedParams[item[0]] = decodeURIComponent(item[1]);
    });
    return parsedParams;
  }


}
