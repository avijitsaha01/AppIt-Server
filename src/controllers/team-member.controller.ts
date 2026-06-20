import { Request, Response } from 'express';
import { TeamMember } from '../models/team-member.model.js';
import { createTeamMemberSchema } from '../validators/team-member.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getTeamMembers(_req: Request, res: Response) {
  const members = await TeamMember.find().sort('order');
  res.json({ members });
}

export async function createTeamMember(req: Request, res: Response) {
  const data = createTeamMemberSchema.parse(req.body);
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const member = await TeamMember.create({ ...data, image });
  res.status(201).json({ member });
}

export async function updateTeamMember(req: Request, res: Response) {
  const { id } = req.params;
  const data = createTeamMemberSchema.parse(req.body);
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const member = await TeamMember.findByIdAndUpdate(id, { ...data, ...(image && { image }) }, { new: true });
  if (!member) throw ApiError.notFound('Team member not found');
  res.json({ member });
}

export async function deleteTeamMember(req: Request, res: Response) {
  const { id } = req.params;
  const member = await TeamMember.findByIdAndDelete(id);
  if (!member) throw ApiError.notFound('Team member not found');
  res.json({ message: 'Team member deleted' });
}
