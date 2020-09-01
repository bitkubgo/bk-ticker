import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { BitkubService } from "../../services/bitkub.service";
import { WebsocketService } from "../../services/websocket.service";
import { ExchangeService } from "../../services/exchange.service";
import { Subscription } from "rxjs";
import { TickerWs } from "../../model/ticker-ws";
import { TradeWs } from "src/app/model/trade-ws";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ticker-table",
  templateUrl: "./ticker-table.component.html",
  styleUrls: ["./ticker-table.component.scss"]
})
export class TickerTableComponent implements OnInit, OnDestroy {
  private $tradeWs: Subscription;

  public tradeSlotData = new Array<TradeWs>();
  public tradeSlot = 0; // max: 20
  private rowid = 17;

  constructor(
    private bkServe: BitkubService,
    private wsServe: WebsocketService,
    private exServe: ExchangeService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // when have rowid from path
    this.route.paramMap.subscribe(params => {
      const rowid = params.get("rowid");
      if (rowid) {
        this.rowid = parseInt(rowid);
      }
    });

    this.$tradeWs = this.exServe.subTrade().subscribe(tradeMsg => {
      if (tradeMsg != null) {
        tradeMsg.stream = tradeMsg.stream.slice(14);
        if (this.tradeSlot === this.rowid) {
          this.tradeSlot = 0;
        }

        if (
          this.tradeSlotData === undefined ||
          this.tradeSlotData.length < 10
        ) {
          this.tradeSlotData.push(tradeMsg);
        } else {
          this.tradeSlotData[this.tradeSlot] = tradeMsg;
        }
        this.tradeSlot++;
        this.cd.markForCheck();
      }
    });
  }

  trackTicker(index, data) {
    return data ? index + ":" + data.stream : undefined;
  }

  filterTickerUndefined() {
    return this.tradeSlotData.filter(resp => resp.stream !== undefined);
  }

  ngOnDestroy(): void {
    this.$tradeWs.unsubscribe();
  }
}
