/* eslint-disable radix */
/* eslint-disable consistent-return */
import { uploads } from '../middlewares/cloudinaryConfig';
// import {
//   getComments, getOneComment, editComment,
//   createComment,
// } from './comment';
import createComment from './comment';
import {
  getAllQuerries, getOneQuerries, deleteQuerries, editQuerries, createQuerries,
} from '../helpers/dbQuerries';


export function createGif(req, res) {
  try {
    uploads(req.files[0].path)
      .then((file) => {
        createQuerries(req, res, 'giftable', file.url);
      }).catch((error) => {
        if (error) {
          res.status(500).json({
            status: 'error',
            error: {
              message: 'encountered some issues',
              error,
            },
          });
        }
      });
  } catch (anError) {
    res.status(500).json({
      status: 'error',
      error: {
        message: 'issues with file',
        anError,
      },
    });
  }
}

export function editGif(req, res) {
  try {
    uploads(req.files[0].path)
      .then((file) => {
        editQuerries(req, res, 'giftable', file.url);
      }).catch((error) => {
        if (error) {
          res.status(500).json({
            status: 'error',
            error: {
              message: 'encountered some issues',
              error,
            },
          });
        }
      });
  } catch (anError) {
    res.status(500).json({
      status: 'error',
      error: {
        message: 'issues with file',
        anError,
      },
    });
  }
}

export function getGifs(req, res) {
  getAllQuerries(req, res, 'giftable');
}

export function getOneGif(req, res) {
  getOneQuerries(req, res, 'giftable');
}

export function deleteGif(req, res) {
  deleteQuerries(req, res, 'giftable');
}

// export function getCommentsForGif(req, res) {
//   getComments(req, res, 'gif');
// }

// export function getOneCommentForGif(req, res) {
//   getOneComment(req, res, 'gif');
// }

// export function editCommentForGif(req, res) {
//   editComment(req, res, 'gif');
// }

export function createCommentForGif(req, res) {
  createComment(req, res, 'gif');
}
