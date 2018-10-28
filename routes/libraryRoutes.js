const Libraries = require("../models/Library");
const Project = require("../models/Project");

module.exports = app => {
  app.post(`/api/library/`, (req, res, next) => {
    Libraries.create(req.body)
      .then(() => res.json())
      .catch(err => next(err));
  });

  // get all libraries
  //FINDALL: NEEDS :pId TO FIND ALL WITH :pId
  app.get(`/api/project/:pId/library/`, (req, res, next) => {
    Libraries.find({ project_id: req.params.pId })
      // .populate("suites")
      .then(library => res.json(library))
      .catch(err => next(err));
  });

  // get one library NOT USING
  // app.get("/api/library/:lId", (req, res, next) => {
  //   Libraries.findOne({ library_id: req.params.lId })
  //     // .populate("suites")
  //     .then(library => res.json(library))
  //     .catch(err => next(err));
  // });

  //DELETE: NEEDS :lId TO UPDATE ITSELF
  app.delete("/api/library/:lId", (req, res, next) => {
    Libraries.findOneAndRemove({ _id: req.params.lId })
      .exec()
      .then(() => res.json())
      .catch(err => next(err));
  });

  //UPDATE: NEEDS :lId TO UPDATE ITSELF
  app.put("/api/library/:lId", (req, res, next) => {
    Libraries.findOneAndUpdate(
      { _id: req.params.lId },
      { $set: { library_name: req.body.library_name } },
      { new: true }
    )
      .exec()
      .then(() => res.json())
      .catch(err => next(err));
  });
};
