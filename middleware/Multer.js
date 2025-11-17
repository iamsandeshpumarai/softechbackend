// middleware/Multer.js
const multer = require('multer');
const cloudinary = require('../Cloudinary/Cloudinarysetup.js');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req) => {
      const map = {
        '/brand-partners': 'brandPartners',
        '/stats':          'stats',
        '/ads':            'ads',
        '/journey':        'journey',
        '/testimonials':   'testimonials',
      };
      return map[req.route.path] || 'misc';
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = upload;