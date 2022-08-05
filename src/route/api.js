import express from "express";
import apiController from '../controller/apiController'

let router = express.Router();

const initApiRoute = (app) => {
  router.get("/users", apiController.getAllUsers); //method get
  router.post("/create-user", apiController.createNewUser); //method get
  router.put("/update-user", apiController.updateUser); //method get
  router.delete("/delete-user/:id", apiController.deleteUser); //method get

  return app.use("/api/v1", router);
};
module.exports = initApiRoute;
