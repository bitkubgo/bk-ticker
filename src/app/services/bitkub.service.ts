import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ticker} from '../model/ticker';
import {SymbolData} from '../model/symbol';

@Injectable({
  providedIn: 'root'
})
export class BitkubService {
  constructor(private http: HttpClient) {
  }

  getServerTime(): Observable<any> {
    return this.http.get('/api/servertime');
  }

  getSymbols(): Observable<SymbolData[]> {
    return this.http.get<SymbolData>('/api/market/symbols').pipe(
      map(res => {
        return res['result'].map(
          sym => new SymbolData(sym.id, sym.info, sym.symbol)
        );
      })
    );
  }

  compareFn(a: Ticker, b: Ticker) {
    if (a.quoteVolume < b.quoteVolume) {
      return -1;
    }
    if (a.quoteVolume > b.quoteVolume) {
      return 1;
    }
    return 0;
  }

  getTickers(): Observable<Ticker[]> {
    return this.http.get<Ticker[]>('/api/market/ticker').pipe(
      map(obj => {
        const keys = Object.keys(obj);
        return keys.map(key => {
          if (obj[key]) {
            const data = obj[key];
            return new Ticker(
              data['id'],
              key,
              data['last'],
              data['lowestAsk'],
              data['highestBid'],
              data['percentChange'],
              data['baseVolume'],
              data['quoteVolume'],
              data['isFrozen'],
              data['high24hr'],
              data['low24hr']
            );
          }
        });
      })
    );
  }
}
