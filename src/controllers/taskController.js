const taskModel = require('../models/taskModel');
const taskPriorities = ['low', 'medium', 'high'];

function isRequestBody(body) {
  return body !== null && typeof body === 'object' && !Array.isArray(body);
}

function validateTaskFields({ title, description, status, priority, assignee }) {
  if (typeof title !== 'string' || title.trim().length === 0) {
    return 'title alanı boş olmayan bir metin olmalıdır.';
  }
  if (typeof description !== 'string') {
    return 'description metin olmalıdır.';
  }
  if (!taskModel.taskStatuses.includes(status)) {
    return `status şu değerlerden biri olmalıdır: ${taskModel.taskStatuses.join(', ')}.`;
  }
  if (!taskPriorities.includes(priority)) {
    return `priority şu değerlerden biri olmalıdır: ${taskPriorities.join(', ')}.`;
  }
  if (assignee !== null && typeof assignee !== 'string') {
    return 'assignee metin veya null olmalıdır.';
  }

  return null;
}

function getTaskFields(body) {
  return {
    title: body.title,
    description: body.description === undefined ? '' : body.description,
    status: body.status === undefined ? 'todo' : body.status,
    priority: body.priority === undefined ? 'medium' : body.priority,
    assignee: body.assignee === undefined ? null : body.assignee
  };
}

function listTasks(req, res) {
  res.json({ data: taskModel.findAll() });
}

function getTask(req, res) {
  const task = taskModel.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Görev bulunamadı.' });
  }

  return res.json({ data: task });
}

function createTask(req, res) {
  if (!isRequestBody(req.body)) {
    return res.status(400).json({ error: 'İstek gövdesi bir JSON nesnesi olmalıdır.' });
  }

  const fields = getTaskFields(req.body);
  const validationError = validateTaskFields(fields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const task = taskModel.create({ ...fields, title: fields.title.trim() });
  return res.status(201).json({ data: task });
}

function updateTask(req, res) {
  if (!isRequestBody(req.body)) {
    return res.status(400).json({ error: 'İstek gövdesi bir JSON nesnesi olmalıdır.' });
  }

  const fields = getTaskFields(req.body);
  const validationError = validateTaskFields(fields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const task = taskModel.update(req.params.id, {
    ...fields,
    title: fields.title.trim()
  });
  if (!task) {
    return res.status(404).json({ error: 'Görev bulunamadı.' });
  }

  return res.json({ data: task });
}

function deleteTask(req, res) {
  if (!taskModel.remove(req.params.id)) {
    return res.status(404).json({ error: 'Görev bulunamadı.' });
  }

  return res.status(204).send();
}

module.exports = {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask
};
