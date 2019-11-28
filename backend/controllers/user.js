/* eslint-disable radix */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../dbConnectConfig';
import { getAllQuerries, getOneQuerries, deleteQuerries } from '../helpers/dbQuerries';

export function signup(req, res) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const {
        firstname, lastname, email, gender, jobrole,
        address, staffnumber, employmentdate, administrator,
      } = req.body;
      console.log(req.body.password);
      pool.query('INSERT INTO usertable (firstname, lastname, email, password, gender, jobrole, address, staffnumber, employmentdate, administrator) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);', [firstname, lastname, email, hash, gender, jobrole, address, staffnumber, employmentdate, administrator], (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            status: 'error',
            error: {
              message: 'unable to add user',
              error,
            },
          });
        }
        if (result.rowCount > 0) {
          res.status(201).json({
            status: 'success',
            data: {
              token: '',
              message: 'user created successfully',
            },
          });
        } else {
          res.status(404).json({ status: 'error', error: { message: 'no rows' } });
        }
      });
    });
}

export function signin(req, res) {
  const { email, password } = req.body;
  pool.query('SELECT * FROM usertable where email = $1', [email], (error, results) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        error: {
          message: 'an error occured! please check details and try again',
          error,
        },
      });
    }
    if (results.rowCount > 0) {
      bcrypt.compare(password, results.rows[0].password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({
              status: 'error',
              error: {
                message: 'incorrect password',
              },
            });
          } else {
            const { id, administrator } = results.rows[0];
            const token = jwt.sign({ userId: id, administrator }, 'xyzabc129dsei3likjhseskjdssa;lkjda', { expiresIn: '24h' });
            res.status(200).json({
              status: 'success',
              data: {
                userId: id,
                token,
                administrator,
              },
            });
          }
        }).catch((errors) => {
          res.status(500).json({
            status: 'error',
            error: errors,
          });
        });
    } else {
      res.status(404).json({
        status: 'error',
        error: {
          message: 'user doesnt exist',
        },
      });
    }
  });
}

export function getAllUsers(req, res) {
  getAllQuerries(req, res, 'usertable');
}


export function getOneUser(req, res) {
  getOneQuerries(req, res, 'usertable');
}

export function deleteUser(req, res) {
  deleteQuerries(req, res, 'usertable');
}
