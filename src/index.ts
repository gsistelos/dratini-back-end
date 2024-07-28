import express from "express";
import usersRouter from "./routers/usersRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", usersRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
