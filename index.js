const express = require("express");
const app = express();

app.use(express.json());

const tasks = [
  { id: 1, title: "Task 1", description: "Description 1" },
  { id: 2, title: "Task 2", description: "Description 2" },
  { id: 3, title: "Task 3", description: "Description 3" },
  { id: 4, title: "Task 4", description: "Description 4" },
];

app.get("/Tasks", (req, res) => {
  if (tasks) {
    res.status(200).send(tasks);
  } else {
    return res.status(404).send("No tasks found");
  }
});

app.post("/Tasks/add", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  tasks.push(newTask);
  if (tasks) {
    res.status(200).send({
      message: "Task added successfully",
      updatedTask: newTask,
    });
  } else {
    return res.status(404).send("Task Not Added");
  }
});

app.put("/tasks/edit/:tid", (req, res) => {
  const gettask = tasks.find((task) => task.id === parseInt(req.params.tid));
  if (gettask) {
    (gettask.title = req.body.title),
      (gettask.description = req.body.description);
    res.status(200).send({
      message: "Task updated successfully",
      updatedTask: gettask,
    });
  } else {
    res.status(404).send("Tasks not Found");
  }
});

app.delete("/tasks/delete/:tid", (req, res) => {
  const gettask = tasks.find((task) => task.id === parseInt(req.params.tid));
  if (gettask) {
    const index = tasks.indexOf(gettask);
    tasks.splice(index, 1);
    res.status(200).send("Task deleted");
  } else {
    res.status(404).send("Task not found");
  }
});

app.listen(3000, () => {
  console.log("3000 is running..");
});
