import express from "express";
import cors from "cors";

import { dbConnect } from "./dbConnect.js";

await dbConnect(); // Opretter forbindelse til databasen

import characterRoute from "./routes/character.routes.js";
import classRoute from "./routes/class.routes.js";
import raceRoute from "./routes/race.routes.js";
import backgroundRoute from "./routes/background.routes.js";
import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.route.js";

const expressServer = express();

expressServer.use(cors());

expressServer.use(express.static("uploads"));

expressServer.use(express.json());

expressServer.use(
  characterRoute,
  classRoute,
  raceRoute,
  backgroundRoute,
  userRoute,
  authRoute
);

expressServer.listen(3042, () => {
  console.log("Serveren kører på http://localhost:3042");
});
