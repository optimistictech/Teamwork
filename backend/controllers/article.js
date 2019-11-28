/* eslint-disable consistent-return */
/* eslint-disable radix */
// import {
//   getComments, getOneComment, editComment,
//   createComment,
// } from './comment';
import createComment from './comment';
import {
  getAllQuerries, getOneQuerries, deleteQuerries, editQuerries, createQuerries, getByTag,
} from '../helpers/dbQuerries';

export function createArticle(req, res) {
  createQuerries(req, res, 'articletable', '');
}

export function editArticle(req, res) {
  editQuerries(req, res, 'articletable', '');
}

export function getArticles(req, res) {
  getAllQuerries(req, res, 'articletable');
}

export function getOneArticle(req, res) {
  getOneQuerries(req, res, 'articletable');
}

export function deleteArticle(req, res) {
  deleteQuerries(req, res, 'articletable');
}

// export function getCommentsForArticle(req, res) {
//   getComments(req, res, 'article');
// }

// export function getOneCommentForArticle(req, res) {
//   getOneComment(req, res, 'article');
// }

// export function editCommentForArticle(req, res) {
//   editComment(req, res, 'article');
// }

export function createCommentForArticle(req, res) {
  createComment(req, res, 'article');
}

export function getArticlesByTag(req, res) {
  getByTag(req, res, 'articletable');
}
