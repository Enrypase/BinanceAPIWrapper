# Binance API Wrapper

### Current Issue:

It seems like that there's no easy way to get cryptocurrencies data and importing it in google spreadsheets without going crazy.

Since binance provides (currently) a free (of money and of API Key) access to crypto token prices, I created a simple API Wrapper that returns only the desired data.

### General Istructions

Every endpoint is accessible at `/api/v0`

### Endpoints

- /delta24h returns the % 24 change of the **_symbol_** specified. The symbol search parameter is required (Ex: BTCUSDT, ICPEUR, ...)
- /price returns the current average price (5mins) of the **_symbol_** specified. The symbol search parameter is required (Ex: BTCUSDT, ICPEUR, ...)

### How to use

Well, this code requires no .env file. Just copy the repo somewhere, make it accessible from outside and get your data without loosing time in CoinGecko, API Connector and creating demo keys and giving access to extensions around the world.

### Importing Data

Importing data is a little bit tricky. I'm not sure if it's the local (italian) version, but float numbers on spreadsheet expect to have as a separator between integer and decimal part a ",". But, if IMPORTDATA(url) receives that char in the answer google spreadsheets simply saves the result in 2 different columns. Changing "," to "." for float number makes spreadsheet go crazy.

So I "simply" solved it by returning a simple string "Data:< float_number >" and by replacing chars/string with google spreadsheets function REPLACE(). Not the best solution, but it works enough to make it decent.

Example (Italian language):
`=SOSTITUISCI(SOSTITUISCI(IMPORTDATA("http://<BASE_URI>/api/v0/price?symbol=ICPEUR&"&A1); "Data:"; ""); "."; ",")` Where A1 is a cell that I use to trigger a global update when modified - otherwise it seems like that there's no way of triggering IMPORTDATA every interval of time
`SOSTITUISCI(SOSTITUISCI(IMPORTDATA("http://<BASE_URI>/api/v0/delta24h?symbol=ICPEUR&"&A1); "Data:"; ""); "."; ",")`
