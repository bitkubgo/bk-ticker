import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
  title: string;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
