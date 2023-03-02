import express from "express";

const todoListRoutes = express.Router();

todoListRoutes.get("/todos", getAllTodo);
todoListRoutes.get("/todos/:id", getSingleTodo);
todoListRoutes.post("/todos", createTodo);
todoListRoutes.patch("/todos/:id", updateTodo);
todoListRoutes.delete("/todos/:id", deleteTodo);

export default todoListRoutes;
