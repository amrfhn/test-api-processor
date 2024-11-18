const mongoose = require('mongoose');

// Helper function to get or create the model dynamically
function getModel (tableName) {
   // Check if the model already exists in mongoose.models
   if (mongoose.models[tableName]) {
       return mongoose.models[tableName];  // Return the existing model
   }

   // Define a new schema for the model
   const schema = new mongoose.Schema({}, { strict: false }); // Flexible schema for dynamic content

   // Dynamically create and return the model
   return mongoose.model(tableName, schema);
}

module.exports = getModel;