import express from "express";
import { getUsers } from "../controller/user-controller.js";
const route = express.Router();
route.get("/alluser", getUsers);
export default route;
