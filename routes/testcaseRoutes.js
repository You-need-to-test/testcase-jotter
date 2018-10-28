const Suites = require('../models/Suite');
const TestCases = require('../models/TestCase');


module.exports = (app) => {
  app.get('/api/testcase', (req, res, next) => {
    TestCases.find().sort({ date: -1 })
      .then((testCase) => res.json(testCase))
      .catch((err) => next(err))
  });

  app.get('/api/testcase/:id', (req, res, next) => {
    TestCases.findById(req.params.id)
      .then((testCase) => res.json(testCase))
      .catch((err) => next(err));
  });

  app.post('/api/testcase', function (req, res, next) {
    TestCases.create(req.body)
      .then((testCase)=> {
        return Suites.findOneAndUpdate({_id: req.body.suite_id}, {$push: {test_cases: testCase._id}}, {new: true});
      })
      .then(() => res.json())
      .catch((err) => next(err));
  });

  app.delete('/api/testcase/:id', function (req, res, next) {
    TestCases.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });
  app.put('/api/testcase/:id/', (req, res, next) => {
    TestCases.findOneAndUpdate({_id: req.params.id},{ $set: {test_case: req.body.test_case} }, { new: true })
      .exec()
      .then(() => res.json())
      .catch((err) => next(err));
  });

};
