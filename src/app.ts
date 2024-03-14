import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.json({ message: "This is me" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
