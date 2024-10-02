import axios, { AxiosResponse } from "axios";
import APIEndpoint from "~/libs/classes/APIEndpoint";
import { responseFromError, ServerErrors } from "~/libs/errorCodes";

const route = new APIEndpoint({ GET: {} });

type SymbolPriceType = {
  mins: number;
  price: string;
  closeTime: number;
};
route.GET = async ({ searchParams }) => {
  if (!searchParams.get("symbol"))
    return responseFromError(ServerErrors.BadRequest);
  const data: AxiosResponse<SymbolPriceType, any> = await axios.get(
    `https://api.binance.com/api/v3/avgPrice?symbol=${searchParams.get(
      "symbol"
    )}`
  );
  return new Response(data.data.price.toString());
};

export const { GET } = route;
