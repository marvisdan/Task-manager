const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Task = require('../models/task');

// Tasks Endpoints
/* Then Promise method */
// router.post('/tasks', (req, res) => {
//   const task = new Task(req.body);
//   task.save().then(result => {
//     res.status(201).send(result)
//   }).catch(error => {
//     res.status(400).send(error);
//   });
// })

// router.get('/tasks', (req, res) => {
//   Task.find({}).then(tasks => {
//     res.send(tasks);
//   }).catch(error => {
//     res.status(500).send(error);
//   });
// })

// router.get('/tasks/:id', (req, res) => {
//   const _id = req.params.id;
//   Task.find({ _id }).then(task => {
//     if (!task) {
//       return res.send(404).send();
//     }
//     res.send(task);
//   }).catch(error => {
//     res.status(500).send(error);
//   });
// })

/* --- async/await method --- */
router.post('/tasks', auth, async (req, res) => {
  console.log('REQ BODDYY:', req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/tasks', auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }
  try {
    await req.user.populate({
      path: 'tasks',
      match,
    }).execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send({ error: 'Task not found!' });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => allowUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: 'Task not found!' });
    }

    updates.forEach(update => task[update] = req.body[update]);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

  try {
    if (!task) {
      return res.status(404).send({ error: 'Task not found!' });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;