const express = require("express");
const transactionRouter = express.Router();
const controller = require("../controller/transactionController");

transactionRouter.get("/", controller.findAll);
transactionRouter.get("/:id", controller.findOne);
transactionRouter.post("/", controller.create);
transactionRouter.put("/:id", controller.update);
transactionRouter.delete("/:id", controller.remove);
transactionRouter.delete("/", controller.removeAll);

module.exports = transactionRouter;
