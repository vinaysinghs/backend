import multer from 'multer';
import path from 'path';

interface MulterOptions {
    destination: string;
}

const multerHelper = ({ destination }: MulterOptions) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    return multer({ storage });
};

export default multerHelper;
