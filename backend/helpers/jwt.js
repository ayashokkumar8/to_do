const jwt = require('jsonwebtoken')
const errorHandler = require('./errorhandler')

const extractToken = (bearerToken) => {
  const [prefix, token] = bearerToken.split(' ')
  return token
}
const maxAge = 8 * 60 * 60;
const generateToken = (id, expiresIn = maxAge, secretKey = process.env.JWT_SECRET) => {
  return jwt.sign({ id: id }, secretKey, { expiresIn })
}

const validateResetPasswordToken = (token) => {
  return jwt.verify(token, process.env.JWT_RESET_PASSWORD, (err, payload) => {
    return payload
  })
}

const verifyJwt = ({ token, req, res, next }) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return errorHandler.unauthorized(res)
    }

    const { id } = payload
    req.userId = id

    next()
  })
}

const verifyToken = (req, res, next) => {
  const bearerToken = req.get('Authorization')

  if (!bearerToken) {
    return errorHandler.unauthorized(res)
  }

  const token = extractToken(bearerToken)

  verifyJwt({ token, res, next, req })
}

const verifyTokenFromQueryParams = (req, res, next) => {
  const accessToken = req.query.token

  if (!accessToken) {
    return errorHandler.unauthorized(res)
  }

  verifyJwt({ token: accessToken, req, next, res })
}

module.exports = {
  verifyToken,
  verifyTokenFromQueryParams,
  validateResetPasswordToken,
  generateToken,
}