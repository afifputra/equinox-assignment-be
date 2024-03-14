import express, { Request, Response } from "express";
import * as http from "http";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import CarRoute from "./routes/car";
import OrderRoute from "./routes/order";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.json({ message: "This is me" });
});

app.use("/cars", CarRoute);
app.use("/orders", OrderRoute);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
