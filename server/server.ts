// import app from "./src/app/app";

// const PORT = 8080;

// app.listen(PORT, () => {
//   console.log(`Server running on port http://localhost:${PORT}`);
// });

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
