const { getClient } = require('../db');

module.exports = async (req, res) => {
  const { id } = req.params;

  const client = getClient();
  await client.connect();

  const postByIdRes = await client.query(
    `select p.*, u.username, u.avatar from public.posts p 
    inner join public.users u on p.user_id = u.id 
    where p.user_id = $1 and p.id = $2`,
    [req.jwtPayload.sub, id]
  );

  if (!postByIdRes.rowCount) {
    await client.end();
    return res.status(404).json({ error: 'Post not found' });
  }

  const postById = postByIdRes.rows[0];

  await client.end();

  res.status(200).json(postById);
};
