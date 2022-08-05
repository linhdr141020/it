import express from "express";
import homeController from '../controller/homeController'

let route = express.Router();

const initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);

  route.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
  });

  return app.use("/", route);
};
module.exports = initWebRoute;
