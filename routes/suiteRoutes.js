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
    Suite.findOneAndUpdate(
      { _id: req.params.sId },
      { $set: { suite_name: req.body.suite_name } },
      { new: true }
    )
      .exec()
      .then(() => res.json())
      .catch(err => next(err));
  });
};
