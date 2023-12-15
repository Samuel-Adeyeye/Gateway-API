import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: { sendFile: (arg0: string) => void; }, next: any) {
  res.sendFile(__dirname + '/public/index.html');
});

export default router;
