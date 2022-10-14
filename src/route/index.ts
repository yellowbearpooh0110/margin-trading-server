import express from 'express';

const router = express.Router();

// define a route handler for the default home page
router.get('/', (req, res) => {
  res.send('Hello world!');
});

export default router;
