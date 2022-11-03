import { Request, Response } from 'express';

import * as AssetService from '../service/asset.service';

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
