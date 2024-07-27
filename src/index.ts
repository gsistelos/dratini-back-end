import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    req;
    res;
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
