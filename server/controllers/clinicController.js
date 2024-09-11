const Clinic = require("../model/DataModel"); 

// Get All Clinics
const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find(); 
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clinics", error });
  }
};

// Get Clinic By ID
const getClinicById = async (req, res) => {
  const { id } = req.params;

  try {
    const clinic = await Clinic.findById(id); // Find clinic by ID
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clinic", error });
  }
};

// Add a Clinic
const addClinic = async (req, res) => {
  const {
    clinicName,
    doctorName,
    clinicNumber,
    location,
    numberOfPatients,
    revenue,
  } = req.body;

  try {
    const newClinic = new Clinic({
      clinicName,
      doctorName,
      clinicNumber,
      location,
      numberOfPatients,
      revenue,
    });

    const savedClinic = await newClinic.save(); // Save new clinic to the database
    res.status(201).json(savedClinic);
  } catch (error) {
    res.status(500).json({ message: "Error adding clinic", error });
  }
};

// Edit a Clinic by ID
const editClinicById = async (req, res) => {
  const { id } = req.params;
  const {
    clinicName,
    doctorName,
    clinicNumber,
    location,
    numberOfPatients,
    revenue,
  } = req.body;

  try {
    const updatedClinic = await Clinic.findByIdAndUpdate(
      id,
      {
        clinicName,
        doctorName,
        clinicNumber,
        location,
        numberOfPatients,
        revenue,
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedClinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.status(200).json(updatedClinic);
  } catch (error) {
    res.status(500).json({ message: "Error updating clinic", error });
  }
};

// Delete a Clinic by ID
const deleteClinicById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClinic = await Clinic.findByIdAndDelete(id); // Delete clinic by ID

    if (!deletedClinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.status(200).json({ message: "Clinic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting clinic", error });
  }
};

module.exports = {
  getAllClinics,
  getClinicById,
  addClinic,
  editClinicById,
  deleteClinicById,
};
