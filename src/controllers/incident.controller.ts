import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Incident from '../models/incident.model';

export const getAllIncidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const incidents = await Incident.find({}).sort({ createdAt: -1 });
    const result = incidents.map((incident) => ({
      id: incident._id,
      title: incident.title,
      description: incident.description,
      severity: incident.severity,
      reported_at: incident.reported_at,
    }));
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error(`Error in getAllIncidents Controller: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const createIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, severity } = req.body;
    if (!title?.trim() || !description?.trim() || !severity?.trim()) {
      res.status(400).json({ success: false, message: 'Please fill all the fields' });
      return;
    }

    const ALLOWED_SEVERITIES = ['Low', 'Medium', 'High'];
    if (!ALLOWED_SEVERITIES.includes(severity)) {
      res.status(400).json({
        success: false,
        message: 'Invalid Severity, please select from: Low, Medium, High',
      });
      return;
    }

    const incident = new Incident({ title, description, severity });
    await incident.save();

    res.status(201).json({
      success: true,
      data: {
        id: incident._id,
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        reported_at: incident.reported_at,
      },
    });
  } catch (error: any) {
    console.error(`Error in createIncident Controller: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ success: false, message: 'Invalid ID format.' });
      return;
    }

    const incident = await Incident.findById(id).select('title description severity reported_at');
    if (!incident) {
      res.status(404).json({
        success: false,
        message: 'No incident with the given id exists.',
      });
      return;
    }

    res.status(200).json({ success: true, data: incident });
  } catch (error: any) {
    console.error(`Error in getIncidentById Controller: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const deleteIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ success: false, message: 'Invalid ID format.' });
      return;
    }

    const incident = await Incident.findById(id);
    if (!incident) {
      res.status(404).json({
        success: false,
        message: 'No incident with the given id exists.',
      });
      return;
    }

    await Incident.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Deleted Successfully' });
  } catch (error: any) {
    console.error(`Error in deleteIncidentById Controller: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
