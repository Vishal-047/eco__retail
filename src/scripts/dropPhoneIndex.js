const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// [FIX] Read MONGODB_URI directly from .env.local
const envPath = path.join(__dirname, '../../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const MONGODB_URI = envContent.split('\n').find(line => line.startsWith('MONGODB_URI=')).split('=')[1].trim();

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected Successfully.");
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections found:", collections.map(c => c.name));
    const userCollection = collections.find(col => col.name === 'users' || col.name === 'Users');
    
    if (userCollection) {
      console.log(`Checking for indexes in '${userCollection.name}'...`);
      const indexes = await db.collection(userCollection.name).indexes();
      const phoneIndex = indexes.find(idx => idx.name === 'phone_1');
      
      if (phoneIndex) {
        console.log("Dropping unique index 'phone_1'...");
        await db.collection('users').dropIndex("phone_1");
        console.log("Successfully dropped index 'phone_1'");
      } else {
        console.log("Index 'phone_1' not found. It might have already been dropped.");
      }
    } else {
      console.log("'users' collection not found.");
    }
    
  } catch (err) {
    if (err.codeName === 'IndexNotFound' || (err.message && err.message.includes('index not found'))) {
      console.log("Index already dropped.");
    } else {
      console.error("Database operation failed:", err.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

run();
