import { getAllQuerries } from '../helpers/dbQuerries';

export function getFeed(req, res) {
  getAllQuerries(req, res, 'feedtable');
}

export function getTags(req, res) {
  getAllQuerries(req, res, 'tagtable');
}

// module.exports = getFeed;
