import mysql from "mysql2";
import { dbConfig } from "../../configs/connectDb";

const connectionMySQL = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

connectionMySQL.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

export default connectionMySQL;
