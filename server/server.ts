import { createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

import app from "./src/app/app";
// import { connectionMySQL } from './libs/database/db';
import connectionMySQL from "./src/libs/database/db";

const port = 8000;

app.listen(port, async () => {
  try {
    await connectionMySQL;
    console.log("connect mysql successfully");
    console.log(`Server express running http://localhost:${port}`);
  } catch (error) {
    console.log("err", error);
  }
});
