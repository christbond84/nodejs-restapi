const express = require('express')
const jobsRouter = express.Router()
const {getAllJobs,
       createJob,
       getJob,
       updateJob,
       deleteJob
      } = require('../controllers/jobs')

jobsRouter.route('/').get(getAllJobs).post(createJob)
jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = jobsRouter