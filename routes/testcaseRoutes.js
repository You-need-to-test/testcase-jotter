const Suites = require('../models/Suite');
const TestCase = require('../models/TestCase');
const TestCases = require('../models/TestCase');


module.exports = (app) => {

  //FINDALL: FIND ALL WITH :lId
  app.get('/api/suite/:sId/case/', (req, res, next) => {
    TestCase.find( {suite_id: req.params.sId} ).sort({ date: -1 })
      .then((testCase) => res.json(testCase))
      .catch((err) => next(err))
  });


  // CREATE
  app.post('/api/case', (req, res, next) => {
    TestCase.create(req.body)
      .then(() => res.json())
      .catch((err) => next(err));
  });
};
