const mongoose = require('mongoose');

const toolboxItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 80, min: 0, max: 100 }
}, { _id: false });

const toolboxGroupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [toolboxItemSchema]
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#4f46e5'
  },
  bio: {
    type: String,
    default: 'Full-Stack Developer | Project Manager'
  },
  githubProfile: {
    type: String,
    default: ''
  },
  linkedinProfile: {
    type: String,
    default: ''
  },
  toolbox: {
    type: [toolboxGroupSchema],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
