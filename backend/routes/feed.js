import exp from 'express';
import { getFeed } from '../controllers/feed';
import auth from '../middlewares/auth';

const myRouter = exp.Router();

// specified api endpoint | GET /feed -- working
myRouter.get('/', auth, getFeed);

module.exports = myRouter;
