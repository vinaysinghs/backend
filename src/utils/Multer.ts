import multer from 'multer';
import path from 'path';

interface MulterOptions {
    destination: string;
}

const multerHelper = ({ destination }: MulterOptions) => {
    const storage = multer.diskStorage({
        destination: (req:any, file:any, cb:any) => {
            cb(null, destination);
        },
        filename: (req:any, file:any, cb:any) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    return multer({ storage });
};

export default multerHelper;
