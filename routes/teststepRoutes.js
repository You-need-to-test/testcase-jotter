const TestCases = require('../models/TestCase');
const TestStep = require('../models/TestStep');


module.exports = (app) => {
  app.get('/api/teststep', (req, res, next) => {
    TestStep.find()
      .then((testCase) => res.json(testCase))
      .catch((err) => next(err));
  });

  app.get('/api/teststep/:id', (req, res, next) => {
    TestStep.findById(req.params.id)
      .then((testCase) => res.json(testCase))
      .catch((err) => next(err));
  });

  app.post('/api/teststep', function (req, res, next) {
    TestStep.create(req.body)
      .then((testStep)=> {
        return TestCases.findOneAndUpdate({_id: req.body.test_case_id}, {$push: {test_steps: testStep._id}}, {new: true});
      })
      .then(() => res.json("created"))
      .catch((err) => next(err));
  });

  app.delete('/api/teststep/:id', function (req, res, next) {
    TestStep.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });
  app.put('/api/teststep/:id/', (req, res, next) => {
    TestStep.findOneAndUpdate({_id: req.params.id},{ $set: { test_step: req.body.test_case} }, { new: true })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

};
