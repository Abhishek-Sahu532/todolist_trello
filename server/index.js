import { configDotenv } from "dotenv";
import { app } from "./src/app.js";
import { dbConnection } from "./src/db/mongo.db.js";

configDotenv({
  path: "../.env",
});

const port = process.env.PORT || 3000;

dbConnection()
  .then(() => {
    app.on("error", () => {
      console.log(`Server connection is failed : ${error}`);
      throw error;
    });
    app.listen(port, () => {
      console.log(`Server is running port : ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Warning: database connection is failed`, error);
  });
export { app };
