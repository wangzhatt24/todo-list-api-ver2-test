import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import todoListRoutes from "./routes/todolist.routes.js";
import TodoModel from "./models/todolist.models.js";

//init
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//set up logger
app.use(morgan("tiny"));

//set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create table
try {
  await TodoModel.sync();
  console.log("Table created!");
} catch (error) {
  console.log(error);
}

//set up routes
app.use(todoListRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
