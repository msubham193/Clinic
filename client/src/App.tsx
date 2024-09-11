
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  FaClinicMedical,
  FaUserMd,
  FaUserNurse,
  FaUser,
  FaClipboardList,
  FaCalendarAlt,
  FaClipboardCheck,
  FaTachometerAlt,
} from "react-icons/fa"; 
import Clinic from "./pages/Clinic";

const sidebarItems = [
  { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
  { name: "Clinic", path: "/clinic", icon: <FaClinicMedical /> },
  { name: "Doctors", path: "/doctors", icon: <FaUserMd /> },
  { name: "Nurse", path: "/nurse", icon: <FaUserNurse /> },
  { name: "Patient", path: "/patient", icon: <FaUser /> },
  { name: "Program Coach", path: "/program-coach", icon: <FaClipboardList /> },
  { name: "Programs", path: "/programs", icon: <FaClipboardCheck /> },
  { name: "Appointment Slot", path: "/appointment-slot", icon: <FaCalendarAlt /> },
  { name: "Appointment", path: "/appointment", icon: <FaCalendarAlt /> },
];

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-purple-400 text-white">
          <div className="p-4 text-2xl font-bold  text-center mt-3">Tanwish</div>

          <hr />
          <ul className="p-4 space-y-4 font-medium">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className="hover:bg-purple-500 py-3 rounded-md px-2"
              >
                <Link to={item.path} className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 ">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/clinic" element={<Clinic />} />
            {/* <Route path="/doctors" element={<Doctors />} />
            <Route path="/nurse" element={<Nurse />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/program-coach" element={<ProgramCoach />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/appointment-slot" element={<AppointmentSlot />} />
            <Route path="/appointment" element={<Appointment />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
