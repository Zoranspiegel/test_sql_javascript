const { getClient } = require('../db');
const { SignJWT } = require('jose');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const client = getClient();
  await client.connect();

  const userExistsRes = await client.query(
    'select id from public.users where username ilike $1',
    [username]
  );

  // ERROR 400 Username already taken
  if (userExistsRes.rowCount) {
    await client.end();
    return res.status(400).json({ error: 'Username already taken' });
  }

  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  const newUserRes = await client.query(
    'insert into public.users (username, password) values ($1, $2) returning id',
    [username, hash]
  );

  await client.end();

  const newUser = newUserRes.rows[0];

  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(newUser.id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(jwtSecret);

  res.cookie('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });
  res.status(201).json({ msg: 'Sign up success' });
};
