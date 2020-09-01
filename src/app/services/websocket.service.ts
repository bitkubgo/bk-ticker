import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { share } from "rxjs/operators";
import { ExchangeService } from "./exchange.service";
import { TickerWs } from "../model/ticker-ws";
import { TradeWs } from "../model/trade-ws";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  private subject: WebSocketSubject<any>;

  constructor(private ex: ExchangeService) {}

  public connect(stream: string) {
    this.subject = webSocket("wss://api.bitkub.com/websocket-api/" + stream);
    this.subject.pipe(share()).subscribe(
      msg => {
        const keys = msg.stream.split(".");
        if (keys.length === 3) {
          if (keys[1] === "ticker") {
            this.ex.addTicker(msg as TickerWs);
          } else if (keys[1] === "trade") {
            this.ex.addTrade(msg as TradeWs);
          }
        }
      }, // Called whenever there is a message from the server.
      err => {
        console.log(err);
        this.disconnect();
        this.connect(stream);
        console.log("re-connecting...");
      }, // Called if at any point WebSocket API signals some kind of error.
      () => console.log("complete") // Called when connection is closed (for whatever reason).
    );
  }

  public disconnect() {
    this.subject.unsubscribe();
  }
}
