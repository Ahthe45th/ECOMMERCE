import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mtumba';

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export default mongoose;
