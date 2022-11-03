import express from 'express';

import * as Middleware from '../middleware';
import * as AssetController from '../controller/asset.controller';

const router = express.Router();

/* GET user profile. */
router.get(
  '/balance',
  Middleware.AuthorizationMiddleware,
  AssetController.GetUserAssets
);

export default router;
