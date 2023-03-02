import express from "express";
import Sequelize, { DataTypes } from "sequelize";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";

//init
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const DATABASE_NAME = process.env.DATABASE_NAME;
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DIALECT = process.env.DIALECT;

//set up logger
app.use(morgan("tiny"));

//set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//sequelize
const sequelize = new Sequelize(DATABASE_NAME, USER_NAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

const TodoModel = sequelize.define(
  "todolist",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {}
);

//create table
try {
  await TodoModel.sync();
  console.log("Table created!");
} catch (error) {
  console.log(error);
}

//set up routes
app.get("/todos", async (req, res) => {
  await TodoModel.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/todos/:id", async (req, res) => {
  const todoId = req.params.id;

  await TodoModel.findAll({
    where: {
      id: todoId,
    },
  })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).send(error));
});

app.post("/todos", async (req, res) => {
  const todo = TodoModel.build({
    title: req.body.title,
    content: req.body.content,
    completed: req.body.completed,
  });

  await todo
    .save()
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(400).send(error));
});

app.patch("/todos/:id", async (req, res) => {
  //get field need to be update
  const todoId = req.params.id;

  await TodoModel.update(
    {
      title: req.body.title,
      content: req.body.content,
      completed: req.body.completed,
    },
    {
      where: {
        id: todoId,
      },
    }
  )
    .then(() => res.status(200).json({ success: true, message: "Updated" }))
    .catch((error) => res.status(400).send(error));
});

app.delete("/todos/:id", async (req, res) => {
  //get field id is to be delete
  const todoId = req.params.id;

  await TodoModel.destroy({
    where: {
      id: todoId,
    },
  })
    .then((data) => res.status(200).json({ success: true, message: "Deleted" }))
    .catch((error) => res.status(400).send(error));
});

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
