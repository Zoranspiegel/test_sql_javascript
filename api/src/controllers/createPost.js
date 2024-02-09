const { getClient } = require('../db');

module.exports = async (req, res) => {
  const { content } = req.body;

  const client = getClient();
  await client.connect();

  const newPost = {};
  try {
    const newPostRes = await client.query(
      'insert into public.posts (user_id, content) values ($1, $2) returning *',
      [req.jwtPayload.sub, content]
    );
    Object.assign(newPost, newPostRes.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }

  res.status(201).json({ msg: 'Post successfully created', data: newPost });
};
