// Consistent success envelope: { success, message, data }
export const sendSuccess = (res, data = null, message = 'OK', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });
