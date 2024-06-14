import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

// Initialize the routes
const routes = Router();

//create the endpoints

routes.post("/user/create", createUser);
routes.get("/user/allusers", getAllUsers);
routes.get("/user/single/:id", getSingleUser);
routes.put("/user/update/:id", updateUser);
routes.delete("/user/delete/:id", deleteUser);

export default routes;
