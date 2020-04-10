const Posts = require('../data/helpers/actionModel');

const validatePost = (req, res, next) => {
  const item = req.body
  if(item.notes.length && item.description.length) {
    Posts.insert({
      project_id: item.project_id,
      notes: item.notes,
      description: item.description
    })
      .then(post => {
        req.post = post
        next();
      })
      .catch(err => res.status(500).json({ errorMessage: `Error creating post on server end.`, err }))
  } else {
    res.status(404).json({ errorMessage: `request must contain both notes and a description field.` })
  }
}

const validatePostId = (req, res, next) => {
  const id = req.params.id
  Posts.get(id)
    .then(post => {
      if(post) {
        next();
      } else {
        res.status(404).json({ errorMessage: `Requested ID doesn't exist` })
      }
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal Error in server.` }))
}

module.exports = { validatePost, validatePostId };