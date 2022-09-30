const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const privateRoute = async (req, res, next) => {
  let authToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      authToken = req.headers.authorization.split(' ')[1];

      //Verify JWT
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

      //Get the user data from JWT
      req.user = await userModel.findById(decodedToken.id).select('-password');
      console.log('req.user is: ', req.user);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!authToken) {
    res.status(401).json({ message: 'Please add a token' });
  }
};

module.exports = { privateRoute };
