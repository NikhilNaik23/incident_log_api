// Imports
import express from 'express';
import {
  createIncident,
  deleteIncidentById,
  getAllIncidents,
  getIncidentById,
} from '../controllers/incident.controller';

const router = express.Router();

// Get all incidents
router.get('/', getAllIncidents);

// Create a new incident
router.post('/', createIncident);

// Get a specific incident by ID
router.get('/:id', getIncidentById);

// Delete a specific incident by ID
router.delete('/:id', deleteIncidentById);

export default router;
