const { randomUUID } = require('node:crypto');

const tasks = [];
const taskStatuses = ['todo', 'in-progress', 'done'];

function findAll() {
  return tasks;
}

function findById(id) {
  return tasks.find((task) => task.id === id);
}

function create({
  title,
  description = '',
  status = 'todo',
  priority = 'medium',
  assignee = null
}) {
  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title,
    description,
    status,
    priority,
    assignee,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);
  return task;
}

function update(id, changes) {
  const task = findById(id);
  if (!task) return undefined;

  Object.assign(task, changes, { updatedAt: new Date().toISOString() });
  return task;
}

function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  create,
  findAll,
  findById,
  remove,
  taskStatuses,
  update
};
