import express from "express";
import morgan from "morgan";
import cors from "cors";

//local imports
import userRouter from "./router/user.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

//Initialize app
const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/", userRouter);
app.use(errorMiddleware);
//litener
app.listen(8000, () => {
  console.log("server is running on port 8000");
});

export default app;
