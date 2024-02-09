module.exports = (req, res) => {
  res.clearCookie('jwt-token');
  res.status(200).json({ msg: 'Log out success' });
};
