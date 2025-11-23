const { v4: uuidv4 } = require('uuid');
const { User, ApiKey } = require('../models');

// 1. Endpoint untuk tombol "Generate API Key"
exports.generateKey = (req, res) => {
  const newKey = uuidv4();
  res.status(200).json({ apiKey: newKey });
};

// 2. Endpoint untuk tombol "Save"
exports.saveUserData = async (req, res) => {
  const { firstName, lastName, email, apiKey } = req.body;

  if (!firstName || !lastName || !email || !apiKey) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    // Cari atau buat user baru berdasarkan email
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: { firstName, lastName },
    });

    // Jika user baru dibuat (created=true) atau user lama (created=false),
    // update nama mereka (jika beda)
    if (!created) {
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
    }

    // Buat API key baru yang terhubung dengan user
    const newApiKey = await ApiKey.create({
      apiKey: apiKey,
      userId: user.id,
    });

    res.status(201).json({
      message: 'Data user dan API key berhasil disimpan',
      user: user,
      apiKey: newApiKey,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'API key atau Email sudah digunakan.' });
    }
    res.status(500).json({ message: 'Error server', error: error.message });
  }
};