import mongoose, { Document, Schema } from 'mongoose';

export interface IMedia extends Document {
  media_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  url: string;
  title?: string;
}

const mediaSchema: Schema = new mongoose.Schema({
  media_id: {
    type: String,
    required: true,
    unique: true
  },
  file_name: {
    type: String,
    required: true
  },
  file_type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  file_size: {
    type: Number,
    required: true
  },
  uploaded_by: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<IMedia>('Media', mediaSchema);