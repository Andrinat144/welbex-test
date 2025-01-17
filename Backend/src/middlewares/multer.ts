import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

import config from '@/config/config';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
