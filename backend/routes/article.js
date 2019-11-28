import exp from 'express';
import {
  createArticle, getArticles, getOneArticle, deleteArticle, editArticle, getArticlesByTag,
  createCommentForArticle,
} from '../controllers/article';
// import {
//   deleteComment,
// } from '../controllers/comment';
import auth from '../middlewares/auth';
// import auth from '../middlewares/auth';

const myRouter = exp.Router();

// dont forget the 'auth,' for all routes

// specified api endpoint | POST /articles -- working
myRouter.post('/', auth, createArticle);
// specified api endpoint | PATCH /articles/<:articleId> -- working
myRouter.patch('/:articleId', auth, editArticle);
// specified api endpoint | GET /articles/<:articleId> -- working
myRouter.get('/:articleId', auth, getOneArticle);
myRouter.get('/', auth, getArticles);
// specified api endpoint | DELETE /articles/<:articleId> -- working
myRouter.delete('/:articleId', auth, deleteArticle);
// specified api endpoint | POST /articles/<:articleId>/comment -- working
myRouter.post('/:articleId/comment', auth, createCommentForArticle);
// myRouter.patch('/:articleId/comments/:commentId', auth, editCommentForArticle);
// myRouter.get('/:articleId/comments/:commentId', auth, getOneCommentForArticle);
// myRouter.get('/:articleId/comments', auth, getCommentsForArticle);
// myRouter.delete('/:articleId/comments/:commentId', auth, deleteComment);

myRouter.get('/tag/:tagId', auth, getArticlesByTag);

module.exports = myRouter;
