import express from "express";
import { getUsers, getuserPaginations } from "../controller/user-controller.js";
const route = express.Router();
route.get("/alluser", getuserPaginations);
export default route;
