const { getClient } = require('../db');

module.exports = async (req, res) => {
  const page = Number(req.query.page) || 0;
  const limit = 10;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const feedPostsRes = await client.query(
    `select p.*, u.username, u.avatar from public.posts p 
    inner join public.users u on p.user_id = u.id 
    where user_id in (select user_id from public.follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3`,
    [req.jwtPayload.sub, limit, offset]
  );

  const feedPosts = feedPostsRes.rows;

  await client.end();

  res.status(200).json(feedPosts);
};
