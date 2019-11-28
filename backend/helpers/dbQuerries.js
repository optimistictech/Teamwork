/* eslint-disable consistent-return */
/* eslint-disable radix */
import pool from '../dbConnectConfig';

export function createQuerries(req, res, tableName, file) {
  let feed; let message; let feedtype;
  if (tableName === 'articletable') {
    feed = req.body.feed;
    message = 'unable to create article';
    feedtype = 'art';
  } else if (tableName === 'giftable') {
    feed = file;
    message = 'unable to create gif';
    feedtype = 'gif';
  }
  const {
    tagid, inappropflag, title, authorid,
  } = req.body;
  pool.query('INSERT INTO feedtable (title, feed, authorid, tagId, inappropFlag, feedtype) VALUES ($1, $2, $3, $4, $5, $6);', [title, feed, authorid, tagid, inappropflag, feedtype], (error, result) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: {
          error,
          message,
        },
      });
    }
    if (result.rowCount > 0) {
      const searchquerry = 'SELECT table1.id AS feedid, table1.feed AS feedfeed, table1.title AS feedtitle, table1.createdon AS feedcreatedon, table1.firstname AS authorfirstname, table1.lastname AS authorlastname, table1.authorid AS authorsid, table2.ttag AS category, table1.feedtype AS feedfeedtype FROM (SELECT f.id AS id, f.feed AS feed, f.title AS title, f.createdon AS createdon, u.firstname AS firstname, u.lastname AS lastname, u.id AS authorid, f.feedtype AS feedtype FROM feedtable AS f, usertable AS u WHERE f.authorid = u.id) AS table1, (SELECT af.id AS id, tt.tagName AS ttag FROM feedtable AS af, tagtable AS tt WHERE af.tagid = tt.id) AS table2 WHERE table1.id = table2.id ORDER BY feedid DESC LIMIT 1;';
      pool.query(searchquerry, (inerror, inresult) => {
        if (inerror) {
          return res.status(400).json({
            status: 'error',
            error: {
              error,
              message,
            },
          });
        }
        const {
          feedid, feedtitle, feedfeed, authorsid, feedcreatedon, authorfirstname,
          authorlastname, category, type,
        } = inresult.rows[0];
        res.status(201).json({
          status: 'success',
          data: {
            feedid,
            feedtitle,
            feedfeed,
            type,
            createdOn: feedcreatedon,
            authorsid,
            authorfirstname,
            authorlastname,
            category,
            message: 'feed successfully posted',
          },
        });
      });
    } else {
      res.status(404).json({ status: 'error', error: { message: 'no rows' } });
    }
  });
}

export function editQuerries(req, res, tableName, file) {
  let id;
  let feed; let message;
  if (tableName === 'articletable') {
    id = parseInt(req.params.articleId);
    feed = req.body.feed;
    message = 'unable to update article';
  } else if (tableName === 'giftable') {
    id = parseInt(req.params.gifId);
    feed = file;
    message = 'unable to update gif';
  }
  const { inappropflag, title } = req.body;
  pool.query('update feedtable set title = $1, feed = $2, inappropFlag = $3 where id = $4;', [title, feed, inappropflag, id], (error, result) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: {
          error,
          message,
        },
      });
    }
    if (result.rowCount > 0) {
      const searchquerry = 'SELECT table1.id AS feedid, table1.feed AS feedfeed, table1.title AS feedtitle, table1.createdon AS feedcreatedon, table1.firstname AS authorfirstame, table1.lastname AS authorlastname, table2.ttag AS category, table1.feedtype AS feedfeedtype FROM (SELECT f.id AS id, f.feed AS feed, f.title AS title, f.createdon AS createdon, u.firstname AS firstname, u.lastname AS lastname, f.feedtype AS feedtype FROM feedtable AS f, usertable AS u WHERE f.authorid = u.id) AS table1, (SELECT af.id AS id, tt.tagName AS ttag FROM feedtable AS af, tagtable AS tt WHERE af.tagid = tt.id) AS table2 WHERE table1.id = table2.id AND table1.id = $1;';
      pool.query(searchquerry, [id], (inerror, inresult) => {
        if (inerror) {
          return res.status(400).json({
            status: 'error',
            error: {
              error,
              message,
            },
          });
        }
        const {
          feedid, feedtitle, feedfeed, feedcreatedon, authorfirstname,
          authorlastname, category, type,
        } = inresult.rows[0];
        res.status(200).json({
          status: 'success',
          data: {
            feedid,
            feedtitle,
            feedfeed,
            type,
            createdOn: feedcreatedon,
            authorfirstname,
            authorlastname,
            category,
            message: 'feed successfully updated',
          },
        });
      });
    } else {
      res.status(404).json({ status: 'error', error: { message: 'no rows' } });
    }
  });
}

export function getAllQuerries(req, res, tableName) {
  let que = '';
  const reqId = req.decoded.userId;
  if (tableName === 'articletable') {
    que = `SELECT * FROM feedtable WHERE feedtype = 'art' and authorid = ${reqId} ORDER BY createdon DESC`;
  } else if (tableName === 'giftable') {
    que = `SELECT * FROM feedtable WHERE feedtype = 'gif' and authorid = ${reqId}  ORDER BY createdon DESC`;
  } else if (tableName === 'usertable') que = 'SELECT * FROM usertable';
  else if (tableName === 'feedtable') que = 'SELECT * FROM feedtable ORDER BY createdon DESC';
  else if (tableName === 'tagtable') que = 'SELECT * FROM tagtable ORDER BY id;';
  pool.query(que, (error, results) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        error,
      });
    }
    if (results.rowCount > 0) {
      if (tableName !== 'feedtable' && tableName !== 'articletable' && tableName !== 'giftable') { res.status(200).json({ status: 'success', data: results.rows }); } else {
        let searchquerry = 'SELECT table1.id AS id, table1.feed AS feed, table1.title AS title, table1.createdon AS createdOn, table1.firstname AS authorFirstName, table1.lastname AS authorLastName, table2.ttag AS category, table1.feedtype AS feedType, table1.authorid FROM (SELECT f.id AS id, f.feed AS feed, f.title AS title, f.createdon AS createdon, u.firstname AS firstname, u.lastname AS lastname, f.feedtype AS feedtype, f.authorid as authorid FROM feedtable AS f, usertable AS u WHERE f.authorid = u.id) AS table1, (SELECT af.id AS id, tt.tagName AS ttag FROM feedtable AS af, tagtable AS tt WHERE af.tagid = tt.id) AS table2 WHERE table1.id = table2.id ORDER BY id DESC';
        let artGif;
        if (tableName === 'articletable') artGif = 'art';
        else artGif = 'gif';
        if (tableName !== 'feedtable') searchquerry = `SELECT table3.id AS id, table3.feed AS feed, table3.title AS title, table3.createdon AS createdon, table3.authorFirstName AS authorfirstname, table3.authorlAStname AS authorlAStname, table3.category AS category, table3.feedtype AS feedtype, table3.authorid AS authorid FROM (${searchquerry}) AS table3 WHERE feedtype = '${artGif}' AND authorid = ${reqId};`;
        else searchquerry = `${searchquerry}  LIMIT 10;`;
        pool.query(searchquerry, (inerror, inresult) => {
          if (inerror) {
            return res.status(400).json({
              status: 'error',
              error: {
                error,
                message: 'error encountered while getting feeds',
              },
            });
          }
          res.status(200).json({
            status: 'success',
            data: inresult.rows,
          });
        });
      }
    } else {
      res.status(404).json({ status: 'error', error: { message: 'no rows' } });
    }
  });
}

export function getOneQuerries(req, res, tableName) {
  let id = 0;
  let que = 'SELECT table1.id AS sid, table1.feed AS feed, table1.title AS title, table1.createdon AS createdOn, table1.firstname AS authorFirstName, table1.lastname AS authorLastName, table2.ttag AS category, table1.feedtype AS feedType, table1.authorid FROM (SELECT f.id AS id, f.feed AS feed, f.title AS title, f.createdon AS createdon, u.firstname AS firstname, u.lastname AS lastname, f.feedtype AS feedtype, f.authorid as authorid FROM feedtable AS f, usertable AS u WHERE f.authorid = u.id) AS table1, (SELECT af.id AS id, tt.tagName AS ttag FROM feedtable AS af, tagtable AS tt WHERE af.tagid = tt.id) AS table2 WHERE table1.id = table2.id AND table1.id = $1;';
  if (tableName === 'articletable') {
    id = parseInt(req.params.articleId);
  } else if (tableName === 'giftable') {
    id = parseInt(req.params.gifId);
  } else if (tableName === 'usertable') {
    que = 'SELECT * FROM usertable where id = $1;';
    id = parseInt(req.params.userId);
  }
  pool.query(que, [id], (error, results) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        error,
      });
    }
    if (results.rowCount > 0) {
      if (tableName === 'usertable') {
        res.status(200).json({ status: 'success', data: results.rows });
      } else {
        const {
          sid, feed, title, createdon,
          authorfirstname, authorlastname, category, feedtype, authorid,
        } = results.rows[0];
        const searchquerry = 'SELECT c.id AS comentid, c.coment, c.createdon, c.inappropflag, c.authorid, u.firstname, u.lastname, u.staffnumber FROM commenttable AS c, usertable AS u WHERE c.authorid = u.id AND c.feedid = $1 ORDER BY c.id DESC;';
        pool.query(searchquerry, [id], (inerror, inresult) => {
          if (inerror) {
            return res.status(400).json({
              status: 'error',
              error: {
                error,
                message: 'error encountered while getting feeds',
              },
            });
          }
          res.status(200).json({
            status: 'success',
            data: {
              id: sid,
              createdon,
              title,
              feed,
              authorfirstname,
              authorlastname,
              authorid,
              category,
              feedtype,
              comments: inresult.rows,
            },
          });
        });
      }
    } else {
      res.status(404).json({ status: 'error', error: { message: 'no rows' } });
    }
  });
}

export function deleteQuerries(req, res, tableName) {
  let id = 0; let que; let message;
  if (tableName === 'articletable') {
    que = 'DELETE FROM feedtable where id = $1 and feedtype = \'art\';';
    id = parseInt(req.params.articleId);
    message = 'article deleted successfully';
  } else if (tableName === 'giftable') {
    que = 'DELETE FROM feedtable where id = $1 and feedtype = \'gif\';';
    id = parseInt(req.params.gifId);
    message = 'gif deleted successfully';
  } else if (tableName === 'usertable') {
    que = 'DELETE FROM usertable where id = $1;';
    id = parseInt(req.params.userId);
    message = 'user deleted successfully';
  }
  pool.query(que, [id], (error, results) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        error,
      });
    }
    if (results.rowCount === 1) {
      res.status(200).json({
        status: 'success',
        data: message,
      });
    } else {
      res.status(404).json({
        status: 'error',
        error: { message: 'no rows' },
      });
    }
  });
}

export function getByTag(req, res, tableName) {
  const id = parseInt(req.params.tagId);
  let que = 'SELECT table1.id AS sid, table1.feed AS feed, table1.title AS title, table1.createdon AS createdOn, table1.firstname AS authorFirstName, table1.lastname AS authorLastName, table2.ttag AS category, table2.tid as categoryid, table1.feedtype AS feedType, table1.authorid FROM (SELECT f.id AS id, f.feed AS feed, f.title AS title, f.createdon AS createdon, u.firstname AS firstname, u.lastname AS lastname, f.feedtype AS feedtype, f.authorid as authorid FROM feedtable AS f, usertable AS u WHERE f.authorid = u.id) AS table1, (SELECT af.id AS id, tt.tagName AS ttag, tt.id as tid FROM feedtable AS af, tagtable AS tt WHERE af.tagid = tt.id) AS table2 WHERE table1.id = table2.id  AND feedtype = \'art\' AND table2.tid = $1 ORDER BY sid DESC;';
  if (tableName === 'giftable') {
    que = 'SELECT table1.id AS sid, table1.feed AS feed, table1.title AS title, table1.createdon AS createdOn, table1.firstname AS authorFirstName, table1.lastname AS authorLastName, table2.ttag AS category, table2.tid as categoryid, table1.feedtype AS feedType, table1.authorid FROM (SELECT f.id AS id, f.feed AS feed, f.title AS title, f.createdon AS createdon, u.firstname AS firstname, u.lastname AS lastname, f.feedtype AS feedtype, f.authorid as authorid FROM feedtable AS f, usertable AS u WHERE f.authorid = u.id) AS table1, (SELECT af.id AS id, tt.tagName AS ttag, tt.id as tid FROM feedtable AS af, tagtable AS tt WHERE af.tagid = tt.id) AS table2 WHERE table1.id = table2.id  AND feedtype = \'art\' AND table2.tid = $1 ORDER BY sid DESC;';
  }
  pool.query(que, [id], (error, results) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        error,
      });
    }
    if (results.rowCount > 0) {
      res.status(200).json({
        status: 'success',
        data: results.rows,
      });
    } else {
      res.status(404).json({ status: 'error', error: { message: 'no rows' } });
    }
  });
}
