import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

export const GetMarketChart = CoinGeckoClient.coins.fetchMarketChart;
