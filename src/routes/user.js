import { Router } from 'express';
import User from '../models/user';

const router = new Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates!' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
