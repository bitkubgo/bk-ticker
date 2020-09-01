export interface BitkubSymbolResponse {
  error: number;
  result: BitkubSymbol[];
}

export interface BitkubSymbol {
  id: number;
  info: string;
  symbol: string;
}
