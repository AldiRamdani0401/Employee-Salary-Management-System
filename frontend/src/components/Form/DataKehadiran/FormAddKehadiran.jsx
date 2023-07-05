import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoCalendarClearSharp } from "react-icons/io5";

const FormAddKehadiran = () => {
  const [dataPegawai, setDataPegawai] = useState([]);
  const [dataKehadiran, setDataKehadiran] = useState([]);

  const getDataPegawai = async () => {
    const response = await axios.get("http://localhost:5000/data-pegawai");
    setDataPegawai(response.data);
  };

  const getDataKehadiran = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data-kehadiran");
      setDataKehadiran(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataPegawai();
    getDataKehadiran();
  }, []);

  const [hadir, setHadir] = useState([]);
  const [sakit, setSakit] = useState([]);
  const [alpha, setAlpha] = useState([]);

  const handleHadir = (index, value) => {
    const updateHadir = [...hadir];
    updateHadir[index] = value;
    setHadir(updateHadir);
  };

  const handleSakit = (index, value) => {
    const updateSakit = [...sakit];
    updateSakit[index] = value;
    setSakit(updateSakit);
  };

  const handleAlpha = (index, value) => {
    const updateAlpha = [...alpha];
    updateAlpha[index] = value;
    setAlpha(updateAlpha);
  };

  const navigate = useNavigate();

  const saveDataKehadiran = async (e) => {
    e.preventDefault();

    try {
      for (let i = 0; i < dataPegawai.length; i++) {
        const isNamaAda = dataKehadiran.some(
          (kehadiran) => kehadiran.nama_pegawai === dataPegawai[i].nama_pegawai
        );

        if (!isNamaAda) {
          await axios.post("http://localhost:5000/data-kehadiran", {
            nik: dataPegawai[i].nik,
            nama_pegawai: dataPegawai[i].nama_pegawai,
            nama_jabatan: dataPegawai[i].jabatan,
            jenis_kelamin: dataPegawai[i].jenis_kelamin,
            hadir: hadir[i] || 0,
            sakit: sakit[i] || 0,
            alpha: alpha[i] || 0,
          });
          navigate("/data-kehadiran");
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };


  return (
    <section className="section">
      <div className="container">
        <div className="header mt-2 p-5 has-background-link is-flex is-justify-content-space-between">
          <h1 className="title p-3 has-text-white">
            <IoCalendarClearSharp /> Data Kehadiran
          </h1>
          <Link to="/data-kehadiran" className="button is-success mt-4">
            Kembali
          </Link>
        </div>
        <form onSubmit={saveDataKehadiran}>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>NIK</th>
                <th>Nama Pegawai</th>
                <th>Nama Jabatan</th>
                <th>Jenis Kelamin</th>
                <th>Hadir</th>
                <th>Sakit</th>
                <th>Alpha</th>
              </tr>
            </thead>
            <tbody>
              {dataPegawai.map((data, index) => {
                const isNamaAda = dataKehadiran.some(
                  (kehadiran) => kehadiran.nama_pegawai === data.nama_pegawai
                );

                if (isNamaAda) {
                  return null; // Jika nama sudah ada, lewati penampilan data pegawai
                }

                return (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.nik}</td>
                    <td>
                      <Link
                        to={`/data-pegawai/detail/${data.id}`}
                        className="has-text-link"
                      >
                        {data.nama_pegawai}
                      </Link>
                    </td>
                    <td>{data.jabatan}</td>
                    <td>{data.jenis_kelamin}</td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        value={hadir[index] || ""}
                        onChange={(e) => handleHadir(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        value={sakit[index] || ""}
                        onChange={(e) => handleSakit(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        value={alpha[index] || ""}
                        onChange={(e) => handleAlpha(index, e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button type="submit" className="button is-success">
            Simpan
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormAddKehadiran;
