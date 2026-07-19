import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;