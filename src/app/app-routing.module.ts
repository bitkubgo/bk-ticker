import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./page/main/main.component";
import { TickerTableComponent } from "./page/ticker-table/ticker-table.component";
import { DashboardAndTickerComponent } from "./page/dashboard-and-ticker/dashboard-and-ticker.component";

const routes: Routes = [
  {
    path: "card",
    component: MainComponent
  },
  {
    path: "ticker/:rowid",
    component: TickerTableComponent
  },
  {
    path: "dashboard",
    component: DashboardAndTickerComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
