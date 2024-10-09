import multer from 'multer';
import fs from 'fs';

const getExtensionFromMimeType = (mimetype: string): string => {
  switch (mimetype) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return '.jpg';
  }
};

export const removeFile = (filePath: string) => {
  return new Promise<void>((resolve, reject) => {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
    resolve();
  });
};

export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  if (fileTypes.test(file.mimetype)) {
    return cb(null, true);
  }
  cb(new Error('File type is not accepted'));
};

export const multerConfig = (imagePath?: string, fileName?: string) => {
  const uploadFolder = imagePath || '';
  const uploadFile = fileName || '';

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const formatFile = getExtensionFromMimeType(file.mimetype);
      const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
      cb(null, `${uploadFile}-${uniqueSuffix}.${formatFile}`);
    },
  });

  return storage;
};
