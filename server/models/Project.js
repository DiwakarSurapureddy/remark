const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, enum: ['pending', 'active', 'done'], default: 'pending' }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Processing', 'Completed'],
    default: 'Processing'
  },
  deployed: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  githubUrl: {
    type: String,
    default: ''
  },
  deployUrl: {
    type: String,
    default: ''
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  steps: {
    type: [stepSchema],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
