export const Status = {
  STATUS_TRUE: true,
  STATUS_FALSE: false
}

export const StatusCode = {
  HTTP_OK: 200,
  HTTP_BAD_REQUEST: 400,
  HTTP_VALIDATION: 402,
  HTTP_UNAUTHORIZED: 401,
  HTTP_INTERNAL_SERVER_ERROR: 500,
  HTTP_CREATED: 201,
  HTTP_NOT_FOUND: 404,
  HTTP_CONFLICT: 409,
  HTTP_TOKEN_EXPIRED: 403,
  HTTP_VALIDATION_ERROR: 422,
  HTTP_INVALID_REQUEST: 400,
  HTTP_TOO_MANY_REQUESTS: 429,
  // HTTP_VALIDATION_EMAIL_VARIFIED: HttpStatus.OK,
}

export const StatusMessage = {
  HTTP_CREATED: 'Created',
  HTTP_OK: 'Success',
  HTTP_BAD_REQUEST: 'Bad Request.',
  HTTP_VALIDATION: 'Enter correct details.',
  HTTP_NOT_FOUND: 'Not Found.',
  HTTP_UNAUTHORIZED: 'Unauthorized.',
  HTTP_CONFLICT: 'Conflict error occurred.',
  HTTP_TOKEN_EXPIRED: 'The access token expired.',
  HTTP_VALIDATION_ERROR: 'Validation error occurred.',
  HTTP_VALIDATION_LOGIN_PASSWORD: 'Invalid email address or password.',
  HTTP_TOO_MANY_REQUESTS:
    'Too many requests. Please try again in a few minutes.',
  HTTP_INTERNAL_SERVER_ERROR: 'Internal Server Error.',
}