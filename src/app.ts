import express, { Request, Response } from "express";

const app = express();
const port = 6969;

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.json({ message: "This is me" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
