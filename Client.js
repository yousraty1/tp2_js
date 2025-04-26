const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  id: {
    type: Number, // Or String, depending on your preference
    required: true,
    unique: true  // Ensure no duplicate custom IDs
  },
  nom: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
