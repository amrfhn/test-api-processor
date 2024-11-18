const mongoose = require('mongoose');

async function isTableExists(tableName) {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    // Check if the collection name exists
    return collections.some((collection) => collection.name === tableName);
  } catch (error) {
    console.error('Error checking table existence:', error);
    throw error;
  }
}

module.exports = isTableExists;