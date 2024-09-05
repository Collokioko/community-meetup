const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');

module.exports = {
  // Function to sign an access token
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}; // You can add more data to the payload if needed
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '10m', // Access token expires in 10 minutes
        issuer: 'Collotec.com',
        audience: userId, // The user ID is used as the audience
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          reject(createError.InternalServerError('Token signing error'));
        }
        resolve(token);
      });
    });
  },

  // Function to verify an access token
  verifyAccessToken: (req, res, next) => {
    // Check if the Authorization header is present
    if (!req.headers['authorization']) {
      return next(createError.Unauthorized('Authorization token is missing'));
    }

    // Extract token from the Authorization header (Bearer token)
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1]; // Token is the second part of the split

    // Verify the token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // Check if the token has expired or is invalid
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Unauthorized(message));
      }

      // If token is valid, attach the payload to the request object and proceed
      req.payload = payload;
      next();
    });
  },

  // Function to sign a refresh token
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}; // You can add additional data to the payload if needed
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1y', // Refresh token expires in 1 year
        issuer: 'Collotec.com',
        audience: userId, // The user ID is used as the audience
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          reject(createError.InternalServerError('Refresh token signing error'));
        }
        resolve(token);
      });
    });
  },

  // Function to verify a refresh token
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized('Invalid refresh token'));
        }

        const userId = payload.aud;
        resolve(userId); // Return the user ID if the token is valid
      });
    });
  }
};
