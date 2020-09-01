import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Ticker} from '../../model/ticker';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoCardComponent implements OnInit {

  @Input() data: Ticker;

  public secSymbolName: string;

  constructor() {
  }

  ngOnInit() {
    const symbols = this.data.symbol.split('_');
    this.secSymbolName = symbols[1];
  }

}
