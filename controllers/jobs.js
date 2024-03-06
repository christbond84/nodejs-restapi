const { BadRequestError, NotFoundError } = require('../errors')
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const createJob = async (req, res) => {
  const { company, position } = req.body
  if (!company || !position)
    throw new BadRequestError('Company name and position is required')
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const getJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId } } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job)
    throw new NotFoundError(`No job with Id ${jobId} exists for the user`)
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId }
  } = req
  if (company === '' || position === '')
    throw new BadRequestError('company name or position is required ')
  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
  if (!job)
    throw new NotFoundError(`No job with Id ${jobId} exists for the user`)
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {    
    user: { userId },
    params: { id: jobId }
  } = req
  const job = await Job.findOneAndRemove({_id:jobId,createdBy:userId})
  if (!job)
    throw new NotFoundError(`No job with Id ${jobId} exists for the user`)
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
}