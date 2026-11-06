const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middlewares/logger');

const app = express();

app.use(logger);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TaskFlow API' });
});

app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı.' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Geçersiz JSON gövdesi.' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Sunucu hatası oluştu.' });
});

module.exports = app;
