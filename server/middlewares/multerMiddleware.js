import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({

    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    },

    fileFilter: (req, file, cb) => {

        const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

        const extension = path.extname(
            file.originalname
        ).toLowerCase();

        if (allowedExtensions.includes(extension)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only JPG, PNG and WEBP images are allowed"
                ),
                false
            );
        }
    }
});


export default upload;