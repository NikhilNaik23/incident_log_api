import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('Error while connecting MongoDB');
  }
};

export default connectDB;
