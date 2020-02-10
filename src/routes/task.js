import { Router } from 'express';
import Task from '../models/task';

const router = new Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();

    return res.status(201).send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.send(tasks);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
