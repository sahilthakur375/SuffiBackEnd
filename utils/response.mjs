/**
 * Sends a standardized response.
 * @param {Object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {boolean} success - Indicates if the response is successful.
 * @param {string} message - A message to include in the response.
 * @param {Object} data - Additional data to include in the response (optional).
 */
export function sendResponse(res, statusCode, success, message, data = {}) {
    res.status(statusCode).json({
      success,
      message,
      data
    });
  }
  