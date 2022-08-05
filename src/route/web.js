import express from "express";
import homeController from '../controller/homeController'

let route = express.Router();

const initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);
  route.get('/detail/user/:userId',homeController.getDetailPage)
  route.post('/create-new-user',homeController.createNewUser)
  route.post('/delete-user',homeController.deleteUser)
  route.get('/edit-user/:id',homeController.getEditPage)
  route.post('/update-user',homeController.postUpdateUser)
  return app.use("/", route);
};
module.exports = initWebRoute;
