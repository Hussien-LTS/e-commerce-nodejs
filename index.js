require("dotenv").config();
const app = require("./src/app");
const connection = require("./src/services/mongo");

const PORT = process.env.PORT || 3030;

async function startServer() {
  await connection();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
