export class Ticker {
  id: number;
  symbol: string;
  last: number;
  lowestAsk: string;
  highestBid: string;
  percentChange: number;
  baseVolume: number;
  quoteVolume: number;
  isFrozen: string;
  high24hr: string;
  low24hr: string;
  counter: number;

  constructor(
    id,
    symbol,
    last,
    lowestAsk,
    highestBid,
    percentChange,
    baseVolume,
    quoteVolume,
    isFrozen,
    high24hr,
    low24hr
  ) {
    this.id = id;
    this.symbol = symbol;
    this.last = last;
    this.lowestAsk = lowestAsk;
    this.highestBid = highestBid;
    this.percentChange = percentChange;
    this.baseVolume = baseVolume;
    this.quoteVolume = quoteVolume;
    this.isFrozen = isFrozen;
    this.high24hr = high24hr;
    this.low24hr = low24hr;
  }
}
