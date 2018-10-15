const Libraries = require('../models/Library');
const Suites = require('../models/Suite');


module.exports = (app) => {
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

  app.post('/api/suite', function (req, res, next) {
    Suites.create(req.body)
      .then((Library)=> {
        return Libraries.findOneAndUpdate({_id: req.body.library_id}, {$push: {suites: Library._id}}, {new: true});
      })
      .then(() => res.json("suite created successfully"))
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
