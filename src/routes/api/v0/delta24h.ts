import axios, { AxiosResponse } from "axios";
import APIEndpoint from "~/libs/classes/APIEndpoint";
import { responseFromError, ServerErrors } from "~/libs/errorCodes";

const route = new APIEndpoint({ GET: {} });

const obj = {
  symbol: "BNBBTC",
  priceChange: "-94.99999800",
  priceChangePercent: "-95.960",
  weightedAvgPrice: "0.29628482",
  prevClosePrice: "0.10002000",
  lastPrice: "4.00000200",
  lastQty: "200.00000000",
  bidPrice: "4.00000000",
  bidQty: "100.00000000",
  askPrice: "4.00000200",
  askQty: "100.00000000",
  openPrice: "99.00000000",
  highPrice: "100.00000000",
  lowPrice: "0.10000000",
  volume: "8913.30000000",
  quoteVolume: "15.30000000",
  openTime: 1499783499040,
  closeTime: 1499869899040,
  firstId: 28385, // First tradeId
  lastId: 28460, // Last tradeId
  count: 76, // Trade count
};
type SymbolPrice24hType = typeof obj;
route.GET = async ({ searchParams }) => {
  if (!searchParams.get("symbol"))
    return responseFromError(ServerErrors.BadRequest);
  const data: AxiosResponse<SymbolPrice24hType, any> = await axios.get(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${searchParams.get(
      "symbol"
    )}`
  );
  return new Response(`Data:${data.data.priceChangePercent}`);
};

export const { GET } = route;
