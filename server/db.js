import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "sofia",
  password: "Sophia1234",
  database: "blog",
});
