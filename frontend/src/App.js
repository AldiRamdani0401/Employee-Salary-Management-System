import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";

import DataPegawai from "./pages/DataPegawai/DataPegawai.jsx";
import AddPegawai from "./pages/DataPegawai/Form/AddPegawai.jsx";
import EditPegawai from "./pages/DataPegawai/Form/EditPegawai.jsx";

import DataJabatan from "./pages/DataJabatan/DataJabatan.jsx";
import AddJabatan from "./pages/DataJabatan/Form/AddJabatan";
import EditJabatan from "./pages/DataJabatan/Form/EditJabatan";

import DataKehadiran from "./pages/DataKehadiran/DataKehadiran.jsx";
import AddKehadiran from "./pages/DataKehadiran/Form/AddKehadiran.jsx";
import EditKehadiran from "./pages/DataKehadiran/Form/EditKehadiran.jsx";

import DataPotongan from "./pages/DataPotongan/DataPotongan.jsx";
import AddDataPotongan from "./components/Form/DataPotongan/AddDataPotongan.jsx";
import EditDataPotongan from "./components/Form/DataPotongan/EditDataPotongan.jsx";

function App(){
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/data_pegawai" element={<DataPegawai/>}/>
          <Route path="/data_pegawai/add" element={<AddPegawai/>}/>
          <Route path="/data_pegawai/edit/:id" element={<EditPegawai/>}/>
        </Routes>
        <Routes>
          <Route path="/data_jabatan" element={<DataJabatan/>}/>
          <Route path="/data_jabatan/add" element={<AddJabatan/>}/>
          <Route path="/data_jabatan/edit/:id" element={<EditJabatan/>}/>
        </Routes>
        <Routes>
          <Route path="/data_kehadiran" element={<DataKehadiran/>}/>
          <Route path="/data_kehadiran/add" element={<AddKehadiran/>}/>
          <Route path="/data_kehadiran/edit/:id" element={<EditKehadiran/>}/>
        </Routes>
        <Routes>
          <Route path="/data_potongan" element={<DataPotongan/>}/>
          <Route path="/data_potongan/add" element={<AddDataPotongan/>}/>
          <Route path="/data_potongan/edit/:id" element={<EditDataPotongan/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;