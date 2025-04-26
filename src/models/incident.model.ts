// Imports
import mongoose, { Document, Schema } from 'mongoose';

// Incident interface
interface IIncident extends Document {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at: Date;
}

// Incident schema
const incidentSchema = new Schema<IIncident>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
  },
  reported_at: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Incident model
const Incident = mongoose.model<IIncident>('Incident', incidentSchema);

export default Incident;
