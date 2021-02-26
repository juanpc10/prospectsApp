const mongoose = require('../db');

const Schema = mongoose.Schema;

const ProspectoSchema = new Schema ({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  segundoApellido: {type: String, required: true},
  calle: {type: String, required: true},
  numeroCasa: {type: Number, required: true},
  colonia: {type: String, required: true},
  codigoPostal: {type: Number, required: true},
  telefono: {type: Number, required: true},
  rfc: {type: String, required: true},
});

module.exports = mongoose.model('Prospecto', ProspectoSchema);
