const server = require('./src/server/server.js');

// Start the server
const PORT = process.env.PORT || 3001; // Match the port in server.js
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});