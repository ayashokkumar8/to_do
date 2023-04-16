const errorHandler = {
    unauthorized: (res, message = 'Unauthorized') =>
      res.status(401).json({ message }),

    internalServerError: (res, message = 'Internal Server Error') =>
      res.status(500).json({ message }),

    badRequest: (res, message = 'Bad Request') =>
      res.status(400).json({ message }),

    success: (res, message = 'Success', field = 'data', data = {}) =>
      res.status(200).json({ [field]: data, message })
  }

  module.exports = errorHandler