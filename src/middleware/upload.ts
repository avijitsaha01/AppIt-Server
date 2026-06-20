import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiError } from '../utils/api-error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const images = /jpeg|jpg|png|gif|webp|svg/;
  const documents = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (images.test(ext) || documents.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpg, png, gif, webp, svg) and documents (pdf, doc, docx) are allowed'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
