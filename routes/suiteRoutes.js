const Libraries = require('../models/Library');
const Suites = require('../models/Suite');
const Suite = require('../models/Suite');

// LOAD SUITES ON LIBRARY TO DISPLAY

module.exports = (app) => {

  // CREATE
  app.post('/api/suite1', (req, res, next) => {
    Suite.create(req.body)
      .then(() => res.json())
      .catch((err) => next(err));
  });

  // get all suites
  //FINDALL: FIND ALL WITH :lId
  app.get('/api/library/:lId/suite1', (req, res, next) => {
    Suite.find({ library_id: req.params.lId })
      // .populate("test_cases")
      .then((suites) => res.json(suites))
      .catch((err) => next(err));
  });

  //DELETE: DELETE ITSELF WITH :sId
  app.delete('/api/suite1/:id', (req, res, next) => {
    Suite.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

  //UPDATE: UPDATE ITSELF WITH :sId
  app.put("/api/suite1/:sId", (req, res, next) => {
    console.log(req.params.sId)
    console.log(req.body.suite_name)
    Suite.findOneAndUpdate(
      { _id: req.params.sId },
      { $set: { suite_name: req.body.suite_name } },
      { new: true }
    )
      .exec()
      .then(() => res.json())
      .catch(err => next(err));
  });



  app.post('/api/suite', function (req, res, next) {
    Suites.create(req.body)
      .then((Library)=> {
        return Libraries.findOneAndUpdate({_id: req.body.library_id}, {$push: {suites: Library._id}}, {new: true});
      })
      .then(() => res.json("suite created successfully"))
      .catch((err) => next(err));
  });

  app.get('/api/suite', (req, res, next) => {
    Suites.find()
      .populate("test_cases")
      .then((suites) => res.json(suites))
      .catch((err) => next(err));
  });

  // get one suite
  app.get('/api/suite/:id', (req, res, next) => {
    Suites.findById(req.params.id)
      .populate("test_cases")
      .then((suite) => res.json(suite))
      .catch((err) => next(err));
  });

  app.delete('/api/suite/:id', function (req, res, next) {
    Suites.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });
  app.put('/api/suite/:id/', (req, res, next) => {
    Suites.findOneAndUpdate({_id: req.params.id},{ $set: { suite_name: req.body.suite_name} }, { new: true })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });
};
