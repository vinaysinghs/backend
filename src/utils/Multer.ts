const path = require('path');
const multer = require('multer');

export const multerFunction = () => {
    return multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, 'src/uploads');
        },
        filename: (req: any, file: any, cb: any) => {
            console.log(file);
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
}

