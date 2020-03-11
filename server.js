const express = require('express');
const app = express();
const db = require('./db');
const { User, Department } = db.models;
const PORT = 3000;
app.use(require('cors')());
app.use(express.json());

//User Routes
app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  console.log(req.params);
  User.destroy({
    where: {
      id: req.params.id
    }
  }).catch(e => {
    next(e);
  });

  //User.findByPk(req.params.id).then(foundUser => foundUser.delete());

  //   try {
  //     const user = await User.findByPk(req.params.id);
  //     user.destory();
  //     res.status(204).send();
  //   } catch (ex) {
  //     next(ex);
  //   }
});

//Department Routes
app.get('/api/departments', async (req, res, next) => {
  try {
    res.send(await Department.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post('/api/departments', async (req, res, next) => {
  try {
    res.status(201).send(await Department.create(req.body));
  } catch (next) {
    next();
  }
});
app.put('/api/departments/:id', async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id);
    res.status(200).send(department.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/api/departments/:id', async (req, res, next) => {
  console.log('reqqqqqqqq', req.params);
  await Department.destroy({
    where: {
      id: req.params.id
    }
  });
  //   try {
  //     const department = await Department.findByPk(req.params.id);
  //     department.destory(req.body);
  //     res.status(204).send();
  //   } catch (ex) {
  //     next(ex);
  //   }
});
//db.sync();
app.listen(PORT, () => console.log('listening on port 3000'));
