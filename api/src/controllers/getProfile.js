const { getClient } = require('../db');

module.exports = async (req, res) => {
  const client = getClient();
  await client.connect();

  const userProfileRes = await client.query(
    'select id, username, avatar, is_admin from public.users where id = $1',
    [req.jwtPayload.sub]
  );

  await client.end();

  const userProfile = userProfileRes.rows[0];

  res.status(200).json(userProfile);
};
