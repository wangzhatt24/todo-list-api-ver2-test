import TodoModel from "../models/todolist.models.js";

export async function createTodo(req, res) {
  const todo = TodoModel.build({
    title: req.body.title,
    content: req.body.content,
    completed: req.body.completed,
  });

  await todo
    .save()
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(400).send(error));
}

export async function getAllTodo(req, res) {
  await TodoModel.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

export async function getSingleTodo(req, res) {
  const todoId = req.params.id;

  await TodoModel.findAll({
    where: {
      id: todoId,
    },
  })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).send(error));
}

export async function updateTodo(req, res) {
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
}

export async function deleteTodo(req, res) {
  //get field id is to be delete
  const todoId = req.params.id;

  await TodoModel.destroy({
    where: {
      id: todoId,
    },
  })
    .then((data) => res.status(200).json({ success: true, message: "Deleted" }))
    .catch((error) => res.status(400).send(error));
}
