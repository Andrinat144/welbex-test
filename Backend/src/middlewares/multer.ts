import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';

import config from '@/config/config';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
