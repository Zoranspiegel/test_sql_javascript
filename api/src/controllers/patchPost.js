const { getClient } = require('../db');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const client = getClient();
  await client.connect();

  const patchedPostRes = await client.query(
    `update public.posts set content = $1 
    where user_id = $2 and id = $3 returning *`,
    [content, req.jwtPayload.sub, id]
  );

  await client.end();

  if (!patchedPostRes.rowCount) {
    res.status(404).json({ error: 'Post not found' });
  }

  const patchedPost = patchedPostRes.rows[0];

  res.status(200).json({ msg: 'Post successfully edited', data: patchedPost });
};
