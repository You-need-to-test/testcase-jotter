const Libraries = require('../models/Library');
const Project = require('../models/Project');


module.exports = (app) => {

  app.post(`/api/project/:pId/library/`, (req, res, next) =>{
    // console.log(req.params.pId);
    Libraries.create(req.body)
    .catch((err) => next(err));
  });

  //get all libraries
  app.get(`/api/project/:pId/library/`, (req, res, next) => {
    Libraries.find() //where 
      // .populate("suites")
      .then((library) => res.json(library))
      .catch((err) => next(err));
  });

  // get one library
  app.get('/api/project/:pId/library/:lId', (req, res, next) => {
    console.log(req.params.pId)
    Libraries.findOne({"library_index": req.params.lId})
    // .populate("suites")
    .then((library) => res.json(library))
    .catch((err) => next(err));
  });

  app.delete('/api/project/:pId/library/:lId', (req, res, next) => {
    console.log(req.params.lId)
    // Libraries.findOne({ "library_index": req.params.lId })
    Libraries.findOneAndRemove({ "library_index": req.params.lId })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

  // app.put('/api/project/:pId/library/:lId', (req, res, next) => {
  //   Libraries.findOneAndUpdate({_id: req.params.id},{ $set: { library_name: req.body.library_name} }, { new: true })
  //     .exec()
  //     .then(() => res.json())
  //     .catch((err) => next(err));
  // });

  // app.put('/api/project/:id', (req, res, next) => {
  //   Project.findOneAndUpdate({"project_index": req.params.id},{ $set: { project_name: req.body.project_name} }, { new: true })
  //     .exec()
  //     .then(() => res.json())
  //     .catch((err) => next(err));
  // });



  // app.post('/api/library', function (req, res, next) {
  //   Libraries.create(req.body)
  //     // .then((Library)=> {
  //     //   return Project.findOneAndUpdate({_id: req.body.project_id}, {$push: {libraries: Library._id}}, {new: true});
  //     // })
  //     .then(() => res.json("library created successfully"))
  //     .catch((err) => next(err));
  // });
};
