const Project = require('../models/Project');

module.exports = (app) => {

  app.post('/api/project/', (req, res, next) => {
    const project = new Project(req.body);
    project.save()
      .then(() => res.json(project))
      .catch((err) => next(err));
  });

  //get all projects
  app.get('/api/project', (req, res, next) => {
    Project.find()
      // .populate("libraries")
      .then((projects) => res.json(projects))
      .catch((err) => next(err));
  });

  // get one project
  app.get('/api/project/:pId', (req, res, next) => {
    Project.findOne({"project_id": req.params.pId})
      // .populate("libraries")
      .then((projects) => res.json(projects))
      .catch((err) => next(err));
  });

  app.delete('/api/project/:pId', function (req, res, next) {
    Project.findOneAndRemove({ "project_id": req.params.pId })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/project/:pId', (req, res, next) => {
    Project.findOneAndUpdate({"project_id": req.params.pId},{ $set: { project_name: req.body.project_name} }, { new: true })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });
};
