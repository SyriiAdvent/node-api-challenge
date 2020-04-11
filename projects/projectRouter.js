// Projects Router
const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();
const verify = require('../middleware/projectWare')

// GET Projects
router.get('/', (req, res) => {
  Projects.get()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving projects.`, err }))
})

// Create Projects
router.post('/', verify.validateProject, (req, res) => {
  res.status(201).json(req.project)
})

// All ids must be verified beyond this endbpoint
router.use(verify.validateProjectId) 

// Edit Projects
router.put('/:id', (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving projects.`, err }))
})

// Delete Projects
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
  .then(() => res.status(201).json({ message: `project was deleted successfully.` }))
  .catch(err => res.status(500).json({ errorMessage: `There was a error while deleting project.`, err }))
})

module.exports = router;