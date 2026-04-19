exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File tidak ada' });
  }

  res.json({
    message: 'Upload berhasil',
    file: req.file.filename
  });
};