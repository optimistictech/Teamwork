import exp from 'express';
// import multiparts from 'connect-multiparty';
import upload from '../middlewares/multerConfig';
import {
  createGif, getGifs, getOneGif, editGif, deleteGif,
  //   getCommentsForGif, getOneCommentForGif, editCommentForGif,
  createCommentForGif,
} from '../controllers/gif';
// import {
//   deleteComment,
// } from '../controllers/comment';
import auth from '../middlewares/auth';
// import auth from '../middlewares/auth';

// const multipart = multiparts();
const myRouter = exp.Router();

// specified api endpoint | POST /gifs -- working
myRouter.post('/', auth, upload.any(), createGif);
// not specified api endpoint | PATCH /gifs/<:gifId> -- working
// [in actual sense you dont need to update a gif]
myRouter.patch('/:gifId', auth, editGif);
// specified api endpoint | GET /gifs/<:gifId> -- working
myRouter.get('/:gifId', auth, getOneGif);
myRouter.get('/', auth, getGifs);
// specified api endpoint | DELETE /gifs/<:gifId> -- working
myRouter.delete('/:gifId', auth, deleteGif);
// specified api endpoint | POST /gif/<:gifId>/comment -- working
myRouter.post('/:gifId/comment', auth, createCommentForGif);
// myRouter.patch('/:gifId/comments/:commentId', auth, editCommentForGif);
// myRouter.get('/:gifId/comments/:commentId', auth, getOneCommentForGif);
// myRouter.get('/:gifId/comments', auth, getCommentsForGif);
// myRouter.delete('/:gifId/comments/:commentId', auth, deleteComment);

module.exports = myRouter;
