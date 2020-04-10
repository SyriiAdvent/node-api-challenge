require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000
// Routers
const projectsRouter = require('./projects/projectRouter');
const postsRouter = require('./projects/postsRouter');
// MW
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger')
// Middleware
server.use(helmet())
server.use(logger)
server.use(morgan('short'))
server.use(express.json());
// Routes
server.get('/', (req, res) => {
  res.send(process.env.MAIN_MSG);
});
server.use('/api/projects', projectsRouter);
server.use('/api/posts', postsRouter); // actions = posts

// Server Listener
server.listen(PORT, () => {
  console.log(`\n-= Server is listening on port: ${PORT} =-\n`);
});