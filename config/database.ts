import mongoose from 'mongoose';

let connected = false;

const connectDB = async (source?: string) => {
  mongoose.set('strictQuery', true); // Add this line to set strictQuery to true
  let message: string = source ? `DB connection request from ${source}.` : 'DB connection request.';

  if (connected) {
    message += ' > Already connected.';
    console.log(message);
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(mongoUri);
    connected = true;
    message += ' > Connection successful.';
    console.log(message);
  } catch (error) {
    message += ' > Connection error.';
    console.error(message, error);
  }
};

export default connectDB;
