require('dotenv').config();
const server = require('./src/app');

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`🧞 Listening on port ${PORT}...`);
});
