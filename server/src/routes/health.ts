import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

export default router;
