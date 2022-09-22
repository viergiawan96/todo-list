const express = require("express");
const router = express.Router();
const todo = require("../controller/todo.controller.js");

router.post("/", todo.createTodo);
router.get("/", todo.getAllTodo);
router.get("/:id", todo.getIdTodo);
router.patch("/:id", todo.updateTodo);
router.delete("/:id", todo.deleteTodo);

module.exports = router;
