import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (filePath, folder) => {

    try {

        const result = await cloudinary.uploader.upload(
            filePath,
            {
                folder
            }
        );

        // Delete local file after successful upload
        fs.unlinkSync(filePath);

        return result;

    } catch (error) {

        // Delete local file even if upload fails
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        throw error;
    }
};

export default uploadToCloudinary;