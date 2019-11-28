import exp from 'express';
import {
  signin, signup, getAllUsers, getOneUser, deleteUser,
} from '../controllers/user';
import auth from '../middlewares/auth';
import adminonly from '../middlewares/adminonly';
// import auth from '../middlewares/auth';

const myRouter = exp.Router();

// ensure to add auth to this code below
myRouter.get('/users', auth, getAllUsers);
myRouter.get('/users/:userId', auth, getOneUser);
// specified api endpoint POST /auth/signin -- working
myRouter.post('/signin', signin);
// ensure to add auth and adminonly to this code below
// specified api endpoint POST /auth/create-user -- working
myRouter.post('/create-user', auth, adminonly, signup);
myRouter.delete('/users/:userId', auth, deleteUser);

module.exports = myRouter;
