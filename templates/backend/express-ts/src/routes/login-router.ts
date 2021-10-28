import express from 'express';

const router = express.Router();

/* GET home page. */
router.post('/', (req: any, res: any) => {
  console.log(req.body);
  res.send({ success: true });
});

export default router;
