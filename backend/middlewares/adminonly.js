import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, 'xyzabc129dsei3likjhseskjdssa;lkjda');
    // const userID = decodedToken.userId;
    const adminOrNot = decodedToken.administrator;
    // console.log(adminOrNot);
    if (!adminOrNot) {
      res.status(401).json({
        status: 'error',
        data: {
          message: 'admin only is allowed to create users',
        },
      });
    } else next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      data: {
        error,
        message: 'invalid request',
      },
    });
  }
};
