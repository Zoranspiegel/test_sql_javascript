const { jwtVerify } = require('jose');

module.exports = async (req, res, next) => {
  const token = req.cookies['jwt-token'];

  // ERROR 401 Unauthenticated (no token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  try {
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, jwtSecret);
    req.jwtPayload = payload;
  } catch (error) {
    // ERROR 401 Unauthenticated (invalid token)
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  next();
};
