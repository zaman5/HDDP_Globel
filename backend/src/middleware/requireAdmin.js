const crypto = require('crypto');

// Protects admin-only API routes (candidate data, CVs, enquiries, job publishing).
// The admin page sends the token as "Authorization: Bearer <ADMIN_TOKEN>".
// Fails closed: if ADMIN_TOKEN is missing or too short, nobody gets in.
const MIN_TOKEN_LENGTH = 24;

module.exports = function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN || '';
  if (expected.length < MIN_TOKEN_LENGTH) {
    return res.status(503).json({
      success: false,
      message: `Admin access is not configured. Set ADMIN_TOKEN (at least ${MIN_TOKEN_LENGTH} characters) on the server.`
    });
  }

  const header = req.get('authorization') || '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ success: false, message: 'Admin sign-in required.' });
  }
  next();
};
