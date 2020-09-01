import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainComponent } from "./page/main/main.component";
import { CryptoCardComponent } from "./components/crypto-card/crypto-card.component";
import { TickerTableComponent } from "./page/ticker-table/ticker-table.component";
import { DashboardAndTickerComponent } from "./page/dashboard-and-ticker/dashboard-and-ticker.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CryptoCardComponent,
    TickerTableComponent,
    DashboardAndTickerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
