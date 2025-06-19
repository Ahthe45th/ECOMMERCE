import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://kaziwavijana:GvQCkSIcufEY1mgH@cluster0.1kkzax7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export default mongoose;
