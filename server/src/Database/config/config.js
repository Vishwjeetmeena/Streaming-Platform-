import Sequelize from "sequelize";
import "dotenv/config";
const mysequelize = new Sequelize({
  username: "postgres",
  password: process.env.PSQL,
  database: "StreamingPlatform_DB",
  host: "localhost",
  port: 5433,
  dialect: "postgres"
})

const DbConnection = async () => {
  try {
    await mysequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { mysequelize, DbConnection };

    