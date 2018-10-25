const Project = require('../models/Project');

module.exports = (app) => {

  //get all projects
  app.get('/api/project', (req, res, next) => {
    Project.find()
      // .populate("libraries")
      .then((projects) => res.json(projects))
      .catch((err) => next(err));
  });

  app.post('/api/project/', (req, res, next) => {
    const project = new Project(req.body);
    project.save()
      .then(() => res.json(project))
      .catch((err) => next(err));
  });

  // get one project
  app.get('/api/project/:id', (req, res, next) => {
    // Project.findById(req.params.id)
    Project.findOne({"project_index": req.params.id})
      // .populate("libraries")
      .then((projects) => res.json(projects))
      .catch((err) => next(err));
  });

  app.put('/api/project/:id', (req, res, next) => {
    Project.findOneAndUpdate({"project_index": req.params.id},{ $set: { project_name: req.body.project_name} }, { new: true })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

  app.delete('/api/project/:id', function (req, res, next) {
    Project.findOneAndRemove({ "project_index": req.params.id })
      .exec()
      .then(console.log("TEST"))
      .then(() => res.json())
      .catch((err) => next(err));
  });




};
