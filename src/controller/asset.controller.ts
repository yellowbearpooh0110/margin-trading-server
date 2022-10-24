import { Request, Response } from 'express';
import Joi from 'joi';
import bcryptjs from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import * as UserService from '../service/user.service';

export const DepositAsset = async (req: Request, res: Response) => {
  res.send('Deposit Asset');
};

export const WithdrawAsset = (req: Request, res: Response) => {
  res.send('Deposit Asset');
};
