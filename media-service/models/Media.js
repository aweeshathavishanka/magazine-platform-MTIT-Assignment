const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Media', mediaSchema);