const { getClient } = require('../db');

module.exports = async (req, res) => {
  const { id } = req.params;
  const client = getClient();
  await client.connect();

  const deletedPostRes = await client.query(
    'delete from public.posts where user_id = $1 and id = $2 returning *',
    [req.jwtPayload.sub, id]
  );

  await client.end();

  if (!deletedPostRes.rowCount) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const deletedPost = deletedPostRes.rows[0];

  res.status(200).json({ msg: 'Post successfully deleted', data: deletedPost });
};
