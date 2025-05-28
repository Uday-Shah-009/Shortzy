class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 🚨 Predefined Custom Errors

class NotFoundError extends BaseError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class BadRequestError extends BaseError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, 402);
  }
}

class Authexpire extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

class ConflictError extends BaseError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

class InternalServerError extends BaseError {
  constructor(message = 'Something went wrong') {
    super(message, 500);
  }
}

// 🧯 Global Error Middleware
const ErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: 'error',
      name: err.name,
      message: err.message,
    });
  }

  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong on the server',
  });
};

export  {
  BaseError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  Authexpire,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  ErrorHandler,
};
