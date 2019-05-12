import mongoose from 'mongoose';

import Order from './order';

const connectDb = () => {
  mongoose.set('useCreateIndex', true);
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { Order };

export { connectDb };

export default models;
