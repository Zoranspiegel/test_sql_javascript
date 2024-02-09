const { getClient } = require('../db');

module.exports = async (req, res) => {
  const page = Number(req.query.page) || 0;
  const username = req.query.username;

  const limit = 10;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  if (username) {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar from public.posts p 
      inner join public.users u on p.user_id = u.id 
      where u.username = $1 
      order by created_at desc limit $2 offset $3`,
      [username, limit, offset]
    );
    const userPosts = userPostsRes.rows;
    await client.end();

    res.json(userPosts);
  } else {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar from public.posts p 
      inner join public.users u on p.user_id = u.id 
      where p.user_id = $1 
      order by created_at desc limit $2 offset $3`,
      [req.jwtPayload.sub, limit, offset]
    );
    const userPosts = userPostsRes.rows;
    await client.end();

    res.json(userPosts);
  }
};
