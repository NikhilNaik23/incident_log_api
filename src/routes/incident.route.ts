import express from 'express';
import {
  createIncident,
  deleteIncidentById,
  getAllIncidents,
  getIncidentById,
} from '../controllers/incident.controller';

const router = express.Router();

router.get('/', getAllIncidents);
router.post('/', createIncident);
router.get('/:id', getIncidentById);
router.delete('/:id', deleteIncidentById);

export default router;
