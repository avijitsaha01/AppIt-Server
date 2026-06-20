import { Request, Response } from 'express';
import { JobApplication } from '../models/job-application.model.js';
import { createJobApplicationSchema } from '../validators/job-application.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getJobApplications(_req: Request, res: Response) {
  const applications = await JobApplication.find().populate('job', 'title').sort('-createdAt');
  res.json({ applications });
}

export async function createJobApplication(req: Request, res: Response) {
  const data = createJobApplicationSchema.parse(req.body);
  const resumeFile = req.file ? `/uploads/${req.file.filename}` : undefined;
  const application = await JobApplication.create({ ...data, resumeFile });
  res.status(201).json({ application });
}

export async function updateJobApplication(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'reviewed', 'shortlisted', 'rejected'].includes(status)) {
    throw ApiError.badRequest('Invalid status');
  }
  const application = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
  if (!application) throw ApiError.notFound('Application not found');
  res.json({ application });
}

export async function deleteJobApplication(req: Request, res: Response) {
  const { id } = req.params;
  const application = await JobApplication.findByIdAndDelete(id);
  if (!application) throw ApiError.notFound('Application not found');
  res.json({ message: 'Application deleted' });
}
