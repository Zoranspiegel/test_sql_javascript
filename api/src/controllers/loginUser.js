const { getClient } = require('../db');
const { SignJWT } = require('jose');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const client = getClient();
  await client.connect();

  const loggingUserRes = await client.query(
    'select id, password from public.users where username ilike $1',
    [username]
  );

  if (!loggingUserRes.rowCount) {
    await client.end();
    return res.status(404).json({ error: 'User does not exist' });
  }

  const loggingUser = loggingUserRes.rows[0];
  const match = await bcrypt.compare(password, loggingUser.password);

  if (!match) {
    await client.end();
    return res.status(401).json({ error: 'Invalid password' });
  }

  await client.end();

  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(loggingUser.id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(jwtSecret);

  res.cookie('jwt-token', token, {
    sameSite: 'none',
    httpOnly: true,
    secure: true
  });
  res.status(200).json({ msg: 'Log in success' });
};
