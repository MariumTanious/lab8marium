const express = require('express');
const os = require('os');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/tasksdb';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
  id: Number,
  name: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

// Seed database if empty
Task.countDocuments().then(count => {
  if (count === 0) {
    Task.insertMany([
      { id: 1, name: 'Milk', status: 'done' },
      { id: 2, name: 'Eggs', status: 'done' },
      { id: 3, name: 'Bread', status: 'pending' },
      { id: 4, name: 'Butter', status: 'pending' },
      { id: 5, name: 'Orange juice', status: 'pending' },
    ]);
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({
    app: 'CISC 886 Lab 8 – MongoDB version',
    node: process.version,
    host: os.hostname(),
  });
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find({});
  const grouped = tasks.reduce((acc, t) => {
    (acc[t.status] ||= []).push(t);
    return acc;
  }, {});
  res.json(grouped);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
