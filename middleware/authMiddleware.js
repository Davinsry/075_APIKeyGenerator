const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Tidak ada token, otorisasi ditolak' });
  }

  try {
    // Token ada di format "Bearer <token>"
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Menyimpan info admin di request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};