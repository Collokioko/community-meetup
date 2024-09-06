const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  // Function to sign an access token
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      if (!user || !user._id) {
        return reject(createError.BadRequest('User ID is required and must be defined'));
      }

      const payload = {
        user: {
          id: user._id,      // Include user ID
          role: user.role    // Include user role
        }
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '10m',    // Access token expires in 10 minutes
        issuer: 'Collotec.com',
        audience: user._id.toString(), // Ensure user._id is defined
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          return reject(createError.InternalServerError('Token signing error'));
        }
        resolve(token);
      });
    });
  },

  // Function to verify an access token
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) {
      return next(createError.Unauthorized('Authorization token is missing'));
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Unauthorized(message));
      }

      // Extract the user object from the payload
      req.user = payload.user;  // { id: userId, role: userRole }
      next();
    });
  },

  // Function to sign a refresh token
  signRefreshToken: (user) => {
    return new Promise((resolve, reject) => {
      if (!user || !user._id) {
        return reject(createError.BadRequest('User ID is required and must be defined'));
      }

      const payload = {
        user: {
          id: user._id,      // Include user ID
          role: user.role    // Include user role
        }
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1y',    // Refresh token expires in 1 year
        issuer: 'Collotec.com',
        audience: user._id.toString(), // Ensure user._id is defined
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          return reject(createError.InternalServerError('Refresh token signing error'));
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

        const userId = payload.user.id;  // Extract user ID from payload
        resolve(userId);
      });
    });
  }
};
