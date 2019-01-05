const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Utente = require('../models/Utente');

const CartellaSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  operazioni: {
    type: String,
    required: true
  },
  notemedico: {
    type: String,
    required: true
  }
});

module.exports = Cartella = mongoose.model('cartella', CartellaSchema);
