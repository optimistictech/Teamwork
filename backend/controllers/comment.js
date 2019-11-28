/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable radix */
import pool from '../dbConnectConfig';

// export function getComments(req, res, gifOrArti) {
//   let id;
//   if (gifOrArti === 'gif') id = parseInt(req.params.gifId);
//   else if (gifOrArti === 'article') id = parseInt(req.params.articleId);
//   pool.query('SELECT * FROM commenttable where feedid = $1', [id], (error, results) => {
//     if (error) {
//       return res.status(401).json({
//         status: 'error',
//         data: error,
//       });
//     }
//     if (results.rowCount > 0) {
//       res.status(200).json({ status: 'success', data: results.rows });
//     } else {
//       res.status(404).json({ status: 'error', data: 'no rows' });
//     }
//   });
// }

// export function getOneComment(req, res, gifOrArti) {
//   let id = 0;
//   if (gifOrArti === 'gif') id = parseInt(req.params.gifId);
//   else if (gifOrArti === 'article') id = parseInt(req.params.articleId);
//   const commentId = parseInt(req.params.commentId);
//   pool.query('SELECT * FROM commenttable where id = $1 and feedid = $2;', [commentId, id], (error, results) => {
//     if (error) {
//       return res.status(401).json({
//         status: 'error',
//         data: error,
//       });
//     }
//     if (results.rowCount > 0) {
//       res.status(200).json({ status: 'success', data: results.rows });
//     } else {
//       res.status(404).json({ status: 'error', data: 'no rows' });
//     }
//   });
// }

// export function editComment(req, res, gifOrArti) {
//   let id = 0;
//   if (gifOrArti === 'gif') id = parseInt(req.params.gifId);
//   else if (gifOrArti === 'article') id = parseInt(req.params.articleId);
//   const commentId = parseInt(req.params.commentId);
//   const {
//     coment, inappropflag,
//   } = req.body;
//   pool.query('update commenttable set coment = $1, inappropFlag = $2 where id = $3 and feedid = $4;', [coment, inappropflag, commentId, id], (error, result) => {
//     if (error) {
//       return res.status(401).json({
//         status: 'error',
//         data: error,
//       });
//     }
//     if (result.rowCount > 0) {
//       res.status(200).json({
//         status: 'success',
//         data: 'updated',
//       });
//     } else {
//       res.status(404).json({ status: 'error', data: 'no rows' });
//     }
//   });
// }

// export function deleteComment(req, res) {
//   const commentId = parseInt(req.params.commentId);
//   pool.query('delete from commenttable where id = $1;', [commentId], (error, result) => {
//     if (error) {
//       return res.status(401).json({
//         status: 'error',
//         data: error,
//         // result,
//       });
//     }
//     if (result.rowCount === 1) {
//       res.status(200).json({
//         status: 'success',
//         data: 'deleted',
//         // result,
//       });
//     } else {
//       res.status(404).json({ status: 'error', data: 'no rows' });
//     }
//   });
// }

const createComment = (req, res, gifOrArti) => {
  let feedids;
  if (gifOrArti === 'gif') feedids = parseInt(req.params.gifId);
  else if (gifOrArti === 'article') feedids = parseInt(req.params.articleId);
  // const id = parseInt(req.params.gifId);
  const {
    coment, inappropflag, authorid,
  } = req.body;
  // if (gifOrArti !== 'gif') feedtype = 'art';
  // else feedtype = gifOrArti;
  pool.query('INSERT INTO commenttable (coment, feedid, inappropflag, authorid) VALUES ($1, $2, $3, $4)', [coment, feedids, inappropflag, authorid], (error, result) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        data: error,
        resultants: result,
      });
    }
    if (result.rowCount > 0) {
      const searchquerry = 'SELECT table1.cid AS comentid, table1.cfeedid AS feedid, table1.ccoment AS comentmade, table1.ccreatedon AS comentcreatedon, table1.cinappropflag AS inappropflaged, table1.fcreatedon AS feedcreatedon, table1.ffeed AS feed, table1.ffeedtype AS feedtype, table1.ftitle AS feedtitle, table2.ufirstname AS comentfirstname, table2.ulastname AS comentlastname, table2.ustaffnumber AS comentstaffnumber FROM (SELECT c.id AS cid, c.coment ccoment, c.feedid cfeedid, c.createdon ccreatedon, c.inappropflag cinappropflag, f.createdon AS fcreatedon, f.feed AS ffeed, f.feedtype AS ffeedtype, f.title AS ftitle FROM commenttable AS c, feedtable AS f where f.id = c.feedid) AS table1, (SELECT c.id AS cid, u.id AS uuid, u.firstname AS ufirstname, u.lastname AS ulastname, u.staffnumber AS ustaffnumber FROM usertable AS u, commenttable AS c where c.authorid = u.id) AS table2 where table1.cid = table2.cid ORDER BY comentid DESC LIMIT 1;';
      pool.query(searchquerry, (inerror, inresult) => {
        if (inerror) {
          return res.status(400).json({
            status: 'error',
            data: {
              error,
              message: 'unable to make comment',
            },
          });
        }
        const {
          comentid, comentmade, comentcreatedon, inappropflaged,
          feedid, feedtitle, feed, comentlastname, feedcreatedon,
          comentfirstname, comentstaffnumber, feedtype,
        } = inresult.rows[0];
        res.status(201).json({
          status: 'success',
          data: {
            comentid,
            feedid,
            comentmade,
            createdOn: comentcreatedon,
            inappropflaged,
            feedcreatedon,
            feed,
            feedtype,
            feedtitle,
            comentauthorfirstname: comentfirstname,
            comentauthorlastname: comentlastname,
            authornumber: comentstaffnumber,
            message: 'comment successfully created',
          },
        });
      });
    } else {
      res.status(404).json({ status: 'error', data: 'no rows', resultants: result });
    }
  });
};

module.exports = createComment;
