import express from "express";
import homeController from '../controller/homeController'

let route = express.Router();

const initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);
  route.get('/detail/user/:userId',homeController.getDetailPage)
  route.post('/create-new-user',homeController.createNewUser)

  return app.use("/", route);
};
module.exports = initWebRoute;
