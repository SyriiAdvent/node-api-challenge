// "Actions" Router
const express = require('express');
const Posts = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();
const verify = require('../middleware/postWare')
const verifyProject = require('../middleware/projectWare')

// GET posts
router.get('/', (req, res) => {
  Posts.get()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving Posts.`, err }))
})

// GET posts by Project id
router.get('/:id/projects', verifyProject.validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(items => {
      if(items.length) {
        res.status(200).json(items)
      } else {
        res.status(400).json({ errorMessage: `there are no posts in this project` })
      }
      
    })
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving Posts.`, err }))
})

// Create Posts
router.post('/', verifyProject.validateProjectId, verify.validatePost, (req, res) => {
  res.status(201).json(req.post)
})

// All ids must be verified beyond this endbpoint
router.use(verify.validatePostId) 

// GET posts by ID
router.get('/:id', (req, res) => {
  Posts.get(req.params.id)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving Posts.`, err }))
})

// Edit Posts
router.put('/:id', verify.validatePost, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving Posts.`, err }))
})

// Delete Posts
router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(() => res.status(201).json({ message: `Post was deleted successfully.` }))
  .catch(err => res.status(500).json({ errorMessage: `There was a error while deleting Post.`, err }))
})

module.exports = router;