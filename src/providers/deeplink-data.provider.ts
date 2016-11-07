import { DeeplinkParams } from './../structures/deeplink-params.class';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject    } from 'rxjs/Subject';


@Injectable()
export class DeeplinkDataProvider {
  private _deeplinkUrl$ : Subject<string>;
  private _path$        : Subject<string>;
  private _params$      : Subject<DeeplinkParams>;
  private dataStore     : {
    deeplinkUrl : string,
    path        : string,
    params      : DeeplinkParams,
  };
  public get deeplinkUrl$(): Observable<string>     { return this._deeplinkUrl$.asObservable(); }
  public get path$(): Observable<string>            { return this._path$.asObservable();        }
  public get params$(): Observable<DeeplinkParams>  { return this._params$.asObservable();      }


  public constructor() {
    this.dataStore      = { deeplinkUrl: '', path: '', params: new DeeplinkParams() };
    this._deeplinkUrl$  = <Subject<string>>           new Subject();
    this._path$         = <Subject<string>>           new Subject();
    this._params$       = <Subject<DeeplinkParams>>   new Subject();

    document.addEventListener('deeplink', (event: CustomEvent) => {
      this.dataStore.deeplinkUrl = event.detail.launchUrl;
      this._deeplinkUrl$.next(this.dataStore.deeplinkUrl);
      this.init();
    });
  }

  private init(): void {
    let unparsedParams        : string;
    let splitToComponentsRegex: RegExp = /(.*):\/(\/.*)\?(.*)/;

    this.dataStore.path         = this.dataStore.deeplinkUrl.replace(splitToComponentsRegex, '$2');
    unparsedParams              = this.dataStore.deeplinkUrl.replace(splitToComponentsRegex, '$3');
    this.dataStore.params       = this.parseUrlParams(unparsedParams);

    this._path$.next(this.dataStore.path);
    this._params$.next(this.dataStore.params);
  }

  private parseUrlParams(unparsedParams: string): DeeplinkParams {
    let parsedParams: DeeplinkParams = new DeeplinkParams();
    unparsedParams.split('&').forEach((part: string) => {
      let item: string[] = part.split('=');
      parsedParams[item[0]] = decodeURIComponent(item[1]);
    });
    return parsedParams;
  }

}
