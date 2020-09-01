import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { share } from "rxjs/operators";
import { TickerWs } from "../model/ticker-ws";
import { TradeWs } from "../model/trade-ws";

@Injectable({
  providedIn: "root"
})
export class ExchangeService {
  private ticketEx = new Subject<TickerWs>();
  private tradeEx = new Subject<TradeWs>();

  constructor() {}

  public addTicker(ticker: TickerWs) {
    if (ticker.last) {
      this.ticketEx.next(ticker);
    }
  }

  public subTicker(): Observable<TickerWs> {
    return this.ticketEx.asObservable().pipe(share());
  }

  public addTrade(trade: TradeWs) {
    if (trade.stream) {
      const n = trade.txn.search("SELL");
      if (n >= 0) {
        trade.s = "s";
      } else {
        trade.s = "b";
      }
      this.tradeEx.next(trade);
    }
  }

  public subTrade(): Observable<TradeWs> {
    return this.tradeEx.asObservable().pipe(share());
  }
}
