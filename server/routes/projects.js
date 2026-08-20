const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects/:username - Get all projects for a user
router.get('/:username', async (req, res) => {
  try {
    const cleanUsername = String(req.params.username).trim().toLowerCase();
    const projects = await Project.find({ username: cleanUsername }).sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    console.error('Fetch projects error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
});

// POST /api/projects - Create a project
router.post('/', async (req, res) => {
  try {
    const { username, name, desc, status, deployed, githubUrl, deployUrl, progress, steps } = req.body;

    if (!username || !name) {
      return res.status(400).json({ success: false, message: 'Username and Project Name are required' });
    }

    const newProject = new Project({
      username: String(username).trim().toLowerCase(),
      name,
      desc: desc || '',
      status: status || 'Processing',
      deployed: deployed || 'No',
      githubUrl: githubUrl || '',
      deployUrl: deployUrl || '',
      progress: progress || 0,
      steps: steps || []
    });

    await newProject.save();
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ success: false, message: 'Server error creating project' });
  }
});

// POST /api/projects/sync/:username - Sync full list of user projects
router.post('/sync/:username', async (req, res) => {
  try {
    const cleanUsername = String(req.params.username).trim().toLowerCase();
    const { projects } = req.body;

    if (!Array.isArray(projects)) {
      return res.status(400).json({ success: false, message: 'Projects must be an array' });
    }

    // Delete existing projects for this user and insert fresh set
    await Project.deleteMany({ username: cleanUsername });

    const preparedProjects = projects.map(p => ({
      ...p,
      username: cleanUsername
    }));

    const savedProjects = await Project.insertMany(preparedProjects);
    res.json({ success: true, projects: savedProjects });
  } catch (err) {
    console.error('Sync projects error:', err);
    res.status(500).json({ success: false, message: 'Server error syncing projects' });
  }
});

// PUT /api/projects/:id - Update project by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, project: updatedProject });
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ success: false, message: 'Server error updating project' });
  }
});

// DELETE /api/projects/:id - Delete project by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
});

module.exports = router;
