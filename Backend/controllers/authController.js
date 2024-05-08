const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const name = req.user.name;
    const email = req.user.email;
    const token = jwt.sign({ id: req.user._id }, process.env.SECURITY_KEY, { expiresIn: '24h' });
    res.json({ token, name, email });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  const userInfo = req.body;
  try {
    const existingUser = await User.findOne({ email: userInfo.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address is already registered.' });
    }
    const user = new User(userInfo);
    await user.save();
    res.status(200).json({message: 'Successfull.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};