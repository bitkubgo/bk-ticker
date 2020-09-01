import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { setTheme } from "ngx-bootstrap/utils";
import { BitkubService } from "./services/bitkub.service";
import { WebsocketService } from "./services/websocket.service";
import { Subscription } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ModalComponent } from "./components/modal/modal.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  // public serverTime$;
  // public serverTime;
  public title = "bitkub-ticker";
  private $symbols: Subscription;
  private streamingData: string;
  bsModalRef: BsModalRef;

  constructor(
    private bkServe: BitkubService,
    private wsServe: WebsocketService,
    private modalService: BsModalService
  ) {
    setTheme("bs4");

    // this.serverTime = this.bkServe.getServerTime();

    this.$symbols = this.bkServe.getSymbols().subscribe(resp => {
      this.streamingData = resp
        .map(res => {
          const sym = res.symbol.toLowerCase();
          return "market.ticker." + sym + ",market.trade." + sym;
        })
        .join(",");
      if (this.streamingData !== null && this.streamingData) {
        this.wsServe.connect(this.streamingData);
      }
    });
  }

  ngOnDestroy() {
    // clearInterval(this.serverTime$);
  }

  openModalWithComponent() {
    const initialState = {
      title: "Donate/บริจาค"
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = "Close";
  }
}
