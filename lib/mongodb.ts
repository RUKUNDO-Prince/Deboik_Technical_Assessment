import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseGlobal {
  mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseGlobal['mongoose'];
    }
  }
}

let cached: MongooseGlobal['mongoose'] = (globalThis as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null } as MongooseGlobal['mongoose'];
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
