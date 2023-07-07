import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";

import DataPegawai from "./pages/DataPegawai/DataPegawai.jsx";
import AddPegawai from "./pages/DataPegawai/Form/AddPegawai.jsx";
import EditPegawai from "./pages/DataPegawai/Form/EditPegawai.jsx";
import DetailDataPegawai from "./pages/DataPegawai/DetailDataPegawai/DetailDataPegawai.jsx";

import DataJabatan from "./pages/DataJabatan/DataJabatan.jsx";
import AddJabatan from "./pages/DataJabatan/Form/AddJabatan";
import EditJabatan from "./pages/DataJabatan/Form/EditJabatan";

import DataKehadiran from "./pages/DataKehadiran/DataKehadiran.jsx";
import AddKehadiran from "./pages/DataKehadiran/Form/AddKehadiran.jsx";
import EditKehadiran from "./pages/DataKehadiran/Form/EditKehadiran.jsx";

import DataPotongan from "./pages/DataPotongan/DataPotongan.jsx";
import AddDataPotongan from "./components/Form/DataPotongan/AddDataPotongan.jsx";
import EditDataPotongan from "./components/Form/DataPotongan/EditDataPotongan.jsx";

import DataGaji from "./pages/DataGaji/DataGaji.jsx";
import DetailDataGaji from "./components/SideBar/DataGajiList/DetailDataGaji/DetailDataGaji.jsx"

import LaporanGaji from "./pages/Laporan/LaporanGaji/LaporanGaji.jsx";
import PrintPageGaji from "./pages/Laporan/LaporanGaji/PrintPage.jsx";
import LaporanAbsensi from "./pages/Laporan/LaporanAbsensi/LaporanAbsensi.jsx";
import PrintPageAbsensi from "./pages/Laporan/LaporanAbsensi/PrintPage.jsx";



function App(){
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/data-pegawai/detail/:id" element={<DetailDataPegawai/>}/>
          <Route path="/data-pegawai/detail/name/:nama" element={<DetailDataPegawai/>}/>
          <Route path="/data-pegawai" element={<DataPegawai/>}/>
          <Route path="/data-pegawai/add" element={<AddPegawai/>}/>
          <Route path="/data-pegawai/edit/:id" element={<EditPegawai/>}/>
        </Routes>
        <Routes>
          <Route path="/data-jabatan" element={<DataJabatan/>}/>
          <Route path="/data-jabatan/add" element={<AddJabatan/>}/>
          <Route path="/data-jabatan/edit/:id" element={<EditJabatan/>}/>
        </Routes>
        <Routes>
          <Route path="/data-kehadiran" element={<DataKehadiran/>}/>
          <Route path="/data-kehadiran/add" element={<AddKehadiran/>}/>
          <Route path="/data-kehadiran/edit/:id" element={<EditKehadiran/>}/>
        </Routes>
        <Routes>
          <Route path="/data-potongan" element={<DataPotongan/>}/>
          <Route path="/data-potongan/add" element={<AddDataPotongan/>}/>
          <Route path="/data-potongan/edit/:id" element={<EditDataPotongan/>}/>
        </Routes>
        <Routes>
          <Route path="/data-gaji" element={<DataGaji/>}/>
          <Route path="/data-gaji/add" element={<AddDataPotongan/>}/>
          <Route path="/data-gaji/name/:name" element={<DetailDataGaji/>}/>
        </Routes>
        <Routes>
          <Route path="/laporan/gaji" element={<LaporanGaji/>}/>
          <Route path="/laporan/gaji/print-page" element={<PrintPageGaji/>} />
          <Route path="/laporan/absensi" element={<LaporanAbsensi/>}/>
          <Route path="/laporan/absensi/print-page" element={<PrintPageAbsensi/>} />
          <Route path="/data-gaji/name/:name" element={<DetailDataGaji/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;