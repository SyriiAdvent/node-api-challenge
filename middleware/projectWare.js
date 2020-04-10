const Projects = require('../data/helpers/projectModel');

const validateProject = (req, res, next) => {
  const item = req.body
  if(item.name.length && item.description.length) {
    Projects.insert(req.body)
      .then(project => {
        req.project = project
        next();
      })
      .catch(err => res.status(500).json({ errorMessage: `Error creating project on server end.`, err }))
  } else {
    res.status(404).json({ errorMessage: `request must contain both name and a description field.` })
  }
}

const validateProjectId = (req, res, next) => {
  const id = req.params.id
  Projects.get(id)
    .then(project => {
      if(project) {
        next();
      } else {
        res.status(404).json({ errorMessage: `Requested ID doesn't exist` })
      }
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal Error in server.` }))
}

module.exports = { validateProject, validateProjectId };