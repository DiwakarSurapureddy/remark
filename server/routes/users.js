const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// GET /api/users/:username
router.get('/:username', async (req, res) => {
  try {
    const cleanUsername = String(req.params.username).trim().toLowerCase();
    const user = await User.findOne({ username: cleanUsername });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userObj = user.toObject();
    delete userObj.password;
    res.json({ success: true, user: userObj });
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching user' });
  }
});

// PUT /api/users/:username
router.put('/:username', async (req, res) => {
  try {
    const cleanUsername = String(req.params.username).trim().toLowerCase();
    const { color, bio, githubProfile, linkedinProfile, toolbox, password } = req.body;

    const user = await User.findOne({ username: cleanUsername });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (color) user.color = color;
    if (bio !== undefined) user.bio = bio;
    if (githubProfile !== undefined) user.githubProfile = githubProfile;
    if (linkedinProfile !== undefined) user.linkedinProfile = linkedinProfile;
    if (toolbox) user.toolbox = toolbox;

    if (password && password.trim()) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password.trim(), salt);
    }

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userObj
    });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ success: false, message: 'Server error updating user' });
  }
});

module.exports = router;
