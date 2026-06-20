import { Request, Response } from 'express';
import { Job } from '../models/job.model.js';
import { createJobSchema } from '../validators/job.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getJobs(_req: Request, res: Response) {
  const jobs = await Job.find().sort('-createdAt');
  res.json({ jobs });
}

export async function getOpenJobs(_req: Request, res: Response) {
  const jobs = await Job.find({ status: 'open' }).sort('-createdAt');
  res.json({ jobs });
}

export async function createJob(req: Request, res: Response) {
  const data = createJobSchema.parse(req.body);
  const job = await Job.create(data);
  res.status(201).json({ job });
}

export async function updateJob(req: Request, res: Response) {
  const { id } = req.params;
  const data = createJobSchema.parse(req.body);
  const job = await Job.findByIdAndUpdate(id, data, { new: true });
  if (!job) throw ApiError.notFound('Job not found');
  res.json({ job });
}

export async function deleteJob(req: Request, res: Response) {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw ApiError.notFound('Job not found');
  res.json({ message: 'Job deleted' });
}
