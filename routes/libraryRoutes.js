const Libraries = require('../models/Library');
const Project = require('../models/Project');


module.exports = (app) => {
  //get all libraries
  app.get('/api/library', (req, res, next) => {
    Libraries.find()
      .populate("suites")
      .then((library) => res.json(library))
      .catch((err) => next(err));
  });

  // get one library
  app.get('/api/library/:id', (req, res, next) => {
    Libraries.findById(req.params.id)
      .populate("suites")
      .then((library) => res.json(library))
      .catch((err) => next(err));
  });


  app.post('/api/library', function (req, res, next) {
    Libraries.create(req.body)
      .then((Library)=> {
        return Project.findOneAndUpdate({_id: req.body.project_id}, {$push: {libraries: Library._id}}, {new: true});
      })
      .then(() => res.json("library created successfully"))
      .catch((err) => next(err));
  });

  app.delete('/api/library/:id', function (req, res, next) {
    Libraries.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });
  app.put('/api/library/:id/', (req, res, next) => {
    Libraries.findOneAndUpdate({_id: req.params.id},{ $set: { library_name: req.body.library_name} }, { new: true })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

};
