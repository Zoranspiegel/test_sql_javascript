const { getClient } = require('../db');

module.exports = async (req, res) => {
  const page = Number(req.query.page) || 0;
  const limit = 5;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const followerUsersRes = await client.query(
    `select u.id, u.username, u.avatar from public.users u 
    inner join public.follows f on u.id = f.follower_id 
    where f.user_id = $1 
    order by f.created_at desc limit $2 offset $3`,
    [req.jwtPayload.sub, limit, offset]
  );

  await client.end();

  const followerUsers = followerUsersRes.rows;

  res.status(200).json(followerUsers);
};
