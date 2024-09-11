import { useEffect, useState } from "react";
interface ClinicType {
  _id: string;
  clinicName: string;
  doctorName: string;
  clinicNumber: string;
  location: string;
  numberOfPatients: number;
  revenue: number;
}

// Modal component interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClinic: (clinic: ClinicType) => void;
  clinicToEdit: ClinicType | null;
  onUpdateClinic: (clinic: ClinicType) => void;
}
export const Modal = ({
  isOpen,
  onClose,
  onAddClinic,
  clinicToEdit,
  onUpdateClinic,
}: ModalProps) => {
  const [clinicName, setClinicName] = useState(
    clinicToEdit ? clinicToEdit.clinicName : ""
  );
  const [doctorName, setDoctorName] = useState(
    clinicToEdit ? clinicToEdit.doctorName : ""
  );
  const [clinicNumber, setClinicNumber] = useState(
    clinicToEdit ? clinicToEdit.clinicNumber : ""
  );
  const [location, setLocation] = useState(
    clinicToEdit ? clinicToEdit.location : ""
  );
  const [numberOfPatients, setNumberOfPatients] = useState(
    clinicToEdit ? clinicToEdit.numberOfPatients : ""
  );
  const [revenue, setRevenue] = useState(
    clinicToEdit ? clinicToEdit.revenue : ""
  );

  useEffect(() => {
    if (clinicToEdit) {
      setClinicName(clinicToEdit.clinicName);
      setDoctorName(clinicToEdit.doctorName);
      setClinicNumber(clinicToEdit.clinicNumber);
      setLocation(clinicToEdit.location);
      setNumberOfPatients(clinicToEdit.numberOfPatients);
      setRevenue(clinicToEdit.revenue);
    }
  }, [clinicToEdit]);

  const handleSaveClinic = async () => {
    const updatedClinic = {
      clinicName,
      doctorName,
      clinicNumber,
      location,
      numberOfPatients: Number(numberOfPatients),
      revenue,
    };

    if (clinicToEdit) {
      // Update existing clinic
      try {
        const response = await fetch(
          `http://localhost:5000/api/clinics/${clinicToEdit._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedClinic),
          }
        );

        if (response.ok) {
          const updatedClinicData = await response.json();
          onUpdateClinic(updatedClinicData);
          onClose();
        } else {
          console.error("Failed to update clinic");
        }
      } catch (error) {
        console.error("Error updating clinic:", error);
      }
    } else {
      // Add new clinic
      handleAddClinic();
    }

    setClinicName("");
    setDoctorName("");
    setClinicNumber("");
    setLocation("");
    setNumberOfPatients("");
    setRevenue("");

    onClose();
  };

  const handleAddClinic = async () => {
    const newClinic = {
      clinicName,
      doctorName,
      clinicNumber,
      location,
      numberOfPatients: Number(numberOfPatients),
      revenue,
    };

    try {
      const response = await fetch("http://localhost:5000/api/clinics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClinic),
      });

      if (response.ok) {
        const addedClinic = await response.json();
        onAddClinic(addedClinic); // Update the state with the new clinic
        onClose(); // Close the modal
      } else {
        console.error("Failed to add clinic");
      }
    } catch (error) {
      console.error("Error adding clinic:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {clinicToEdit ? "Edit Clinic" : "Add New Clinic"}
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Clinic Name"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Clinic Number"
            value={clinicNumber}
            onChange={(e) => setClinicNumber(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Number of Patients"
            value={numberOfPatients}
            onChange={(e) => setNumberOfPatients(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 px-4 py-2 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleSaveClinic}
          >
            {clinicToEdit ? "Save Changes" : "Add Clinic"}
          </button>
        </div>
      </div>
    </div>
  );
};
