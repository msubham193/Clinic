const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  clinicNumber: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  numberOfPatients: {
    type: Number,
    required: true,
  },
  revenue: {
    type: String,
    required: true,
  },
});

// Create the model from the schema
const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
