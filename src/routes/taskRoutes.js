const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router
  .route('/')
  .get(taskController.listTasks)
  .post(taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
