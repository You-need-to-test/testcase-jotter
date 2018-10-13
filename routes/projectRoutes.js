const Project = require('../models/Project');

module.exports = (app) => {
  app.get('/api/project', (req, res, next) => {
    Project.find()
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });

  app.post('/api/project', function (req, res, next) {
    const project = new Project(req.body);

    project.save()
      .then(() => res.json(project))
      .catch((err) => next(err));
  });

  app.delete('/api/project/:id', function (req, res, next) {
    Project.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((project) => res.json())
      .catch((err) => next(err));
  });

  // app.put('/api/counters/:id/increment', (req, res, next) => {
  //   Project.findById(req.params.id)
  //     .exec()
  //     .then((counter) => {
  //       counter.count++;
  //
  //       counter.save()
  //         .then(() => res.json(counter))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });

  // app.put('/api/counters/:id/decrement', (req, res, next) => {
  //   Project.findById(req.params.id)
  //     .exec()
  //     .then((counter) => {
  //       counter.count--;
  //
  //       counter.save()
  //         .then(() => res.json(counter))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });
};
