import { Request, Response } from 'express';
import Joi from 'joi';

import * as AssetService from '../service/asset.service';
import * as CoinGeckoService from '../service/coingecko.service';

export const DepositAsset = async (req: Request, res: Response) => {
  res.send('Deposit Asset');
};

export const WithdrawAsset = (req: Request, res: Response) => {
  res.send('Deposit Asset');
};

export const GetUserAssets = async (req: Request, res: Response) => {
  if (!req.user) res.status(401).send('Unauthorized');
  const asset = await AssetService.GetAssetByUserId({ user_id: req.user.id });
  res.json({ asset });
};

export const GetAssetChartData = async (req: Request, res: Response) => {
  const schema = Joi.object<{
    coin_id: string;
  }>({
    coin_id: Joi.string().required(),
  });
  const { value, error } = schema.validate(req.query);
  if (error) res.json({ validationError: error });
  CoinGeckoService.GetMarketChart(value.coin_id, {
    vs_currency: 'usd',
    days: '30',
  });
};
