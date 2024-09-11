import { useState, useEffect } from "react";
import { Pen, Search, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Modal } from "../components/Modal";

// Define the ClinicType interface
interface ClinicType {
  _id: string;
  clinicName: string;
  doctorName: string;
  clinicNumber: string;
  location: string;
  numberOfPatients: number;
  revenue: number;
}

const Clinic = () => {
  // Define state with types
  const [clinics, setClinics] = useState<ClinicType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clinicToEdit, setClinicToEdit] = useState<ClinicType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/clinics");
        if (response.ok) {
          const data: ClinicType[] = await response.json();
          setClinics(data);
        } else {
          console.error("Failed to fetch clinics");
        }
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    fetchClinics();
  }, []);

  // Add a new clinic
  const handleAddClinic = (newClinic: ClinicType) => {
    setClinics((prevClinics) => [...prevClinics, newClinic]);
  };

  // Update an existing clinic
  const handleUpdateClinic = (updatedClinic: ClinicType) => {
    setClinics((prevClinics) =>
      prevClinics.map((clinic) =>
        clinic._id === updatedClinic._id ? updatedClinic : clinic
      )
    );
  };

  // Handle edit click
  const handleEditClick = (clinic: ClinicType) => {
    setClinicToEdit(clinic);
    setIsModalOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clinics/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClinics((prevClinics) =>
          prevClinics.filter((clinic) => clinic._id !== id)
        );
      } else {
        console.error("Failed to delete clinic");
      }
    } catch (error) {
      console.error("Error deleting clinic:", error);
    }
  };

  // Filter clinics based on the search term
  const filteredClinics = clinics.filter((clinic) =>
    clinic.clinicName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header Section */}
      <div className="shadow-md h-20 w-full flex items-center justify-end px-4">
        <div className="flex gap-1 items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-sm">Thomas Antree</h1>
            <p className="text-xs">UX Designer</p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrGi0P-IaTc6uhsQv4arhvTmRpBeLKQUvE7q9qNlh4CVJR7pxaadenDS0xoh_tH_Q5PY&usqp=CAU"
            alt=""
            className="rounded-full h-12 w-12 object-cover"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-5 px-4">
          <div className="flex items-center border rounded-lg border-gray-400 px-4 py-2">
            <input
              type="text"
              className="outline-none w-56"
              placeholder="Search by clinic name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5" />
          </div>

          <div className="flex items-center gap-3 text-white">
            <button className="bg-purple-400 px-3 py-2 rounded-lg">
              Export
            </button>
            <button
              className="bg-purple-400 px-3 py-2 rounded-lg"
              onClick={() => {
                setClinicToEdit(null); // Reset modal for adding new clinic
                setIsModalOpen(true);
              }}
            >
              Add Clinic
            </button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-purple-400 text-white">
            <TableRow>
              <TableHead className="w-[100px] text-white">ID</TableHead>
              <TableHead className="text-white">Clinic Name</TableHead>
              <TableHead className="text-white">Doctor Name</TableHead>
              <TableHead className="text-white">Clinic Number</TableHead>
              <TableHead className="text-white">Location</TableHead>
              <TableHead className="text-white">Number of Patients</TableHead>
              <TableHead className="text-white">Revenue</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClinics.map((clinic, index) => (
              <TableRow key={clinic._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{clinic.clinicName}</TableCell>
                <TableCell>{clinic.doctorName}</TableCell>
                <TableCell>{clinic.clinicNumber}</TableCell>
                <TableCell>{clinic.location}</TableCell>
                <TableCell>{clinic.numberOfPatients}</TableCell>
                <TableCell>{clinic.revenue}</TableCell>
                <TableCell className="flex gap-3 text-sm">
                  <Trash
                    className="cursor-pointer h-5 text-red-500"
                    onClick={() => handleDeleteClick(clinic._id)}
                  />
                  <Pen
                    className="cursor-pointer h-5 text-blue-600"
                    onClick={() => handleEditClick(clinic)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal for Adding/Editing Clinic */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClinic={handleAddClinic}
        clinicToEdit={clinicToEdit}
        onUpdateClinic={handleUpdateClinic}
      />
    </div>
  );
};

export default Clinic;
