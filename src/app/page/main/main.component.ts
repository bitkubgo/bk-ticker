import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { BitkubService } from "src/app/services/bitkub.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Ticker } from "src/app/model/ticker";
import { WebsocketService } from "../../services/websocket.service";
import { ExchangeService } from "../../services/exchange.service";
import { NotiService } from "src/app/services/noti.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {
  public tickers: Ticker[];
  private $ticker: Subscription;
  private $tickerWs: Subscription;

  constructor(
    private bkServe: BitkubService,
    private wsServe: WebsocketService,
    private exServe: ExchangeService,
    private cd: ChangeDetectorRef,
    private noti: NotiService
  ) {}

  ngOnInit() {
    this.$ticker = this.bkServe
      .getTickers()
      .pipe(map(res => res.sort((a, b) => b.last - a.last)))
      .subscribe(res => {
        this.tickers = res as Ticker[];
        this.cd.markForCheck();
      });

    this.$tickerWs = this.exServe.subTicker().subscribe(tickerMsg => {
      if (tickerMsg != null && this.tickers) {
        const symbol = tickerMsg.stream.slice(14);
        const tarket = this.tickers.findIndex(
          resp => resp.symbol === symbol.toUpperCase()
        );
        if (tarket >= 0) {
          if (
            this.tickers[tarket].counter === null ||
            this.tickers[tarket].counter === 100
          ) {
            this.tickers[tarket].counter = 0;
          }
          // if (this.tickers[tarket].last != tickerMsg.last) {
          //   this.noti.Noti(
          //     this.tickers[tarket].symbol + " : " + tickerMsg.last
          //   );
          // }
          this.tickers[tarket] = Object.assign(this.tickers[tarket], tickerMsg);
          this.tickers[tarket].counter = this.tickers[tarket].counter + 1;
          this.cd.markForCheck();
        }
      }
    });
  }

  trackTicker(index, data) {
    return data
      ? data.last + ":" + data.baseVolume + ":" + data.counter
      : undefined;
  }

  ngOnDestroy(): void {
    this.$ticker.unsubscribe();
    this.$tickerWs.unsubscribe();
  }
}
