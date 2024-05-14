const File = require('../models/File');

exports.getFile = async (req, res) => {
  try {
    const file = await File.find();
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.setFile = async (req, res) => {
  try {
    const file = new File(req.body);
    await file.save();
    res.status(200).json({ _id: file._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateFile = async (req, res) => {
  try {
    const { _id, ...dataWithoutId } = req.body;
    await File.findByIdAndUpdate(_id, dataWithoutId);
    res.status(200).json('success');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteFile = async (req, res) => {
  try {
    await File.findByIdAndUpdate(req.body._id, {name: req.body.name});
    res.status(200).json('success');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}