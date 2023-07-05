import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { IoCalendarClearSharp } from "react-icons/io5";

const DataKehadiranList = () => {
  const [dataKehadiran, setDataKehadiran] = useState([]);
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [filterNama, setFilterNama] = useState("");

  const getDataKehadiran = async () => {
    const response = await axios.get("http://localhost:5000/data-kehadiran");
    setDataKehadiran(response.data);
  };

  useEffect(() => {
    getDataKehadiran();
  }, []);

  const deleteDataKehadiran = async (id) => {
    await axios.delete(`http://localhost:5000/data-kehadiran/${id}`);
    getDataKehadiran();
  };

  const filteredDataKehadiran = dataKehadiran.filter((data) => {
    const isMatchBulan =
      filterBulan === "" ||
      data.bulan.toLowerCase().includes(filterBulan.toLowerCase());
    const isMatchTahun =
      filterTahun === "" || data.tahun.toString() === filterTahun;
    const isMatchNama =
      filterNama === "" ||
      data.nama_pegawai.toLowerCase().includes(filterNama.toLowerCase());
    return isMatchBulan && isMatchTahun && isMatchNama;
  });

  const handleBulanChange = (event) => {
    setFilterBulan(event.target.value);
  };

  const handleTahunChange = (event) => {
    setFilterTahun(event.target.value);
  };

  const handleNamaChange = (event) => {
    setFilterNama(event.target.value);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="header mt-2 p-5 has-background-link is-flex is-justify-content-space-between">
          <h1 className="title p-3 has-text-white">
            <IoCalendarClearSharp /> Data Kehadiran
          </h1>
          <Link to="/data-kehadiran/add" className="button is-success mt-4">
            Tambah Data
          </Link>
        </div>
        <div className="columns p-3">
          <div className="field mt-4 ml-5">
            <label className="label">Filter Bulan:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Masukkan nama bulan"
                value={filterBulan}
                onChange={handleBulanChange}
              />
            </div>
          </div>
          <div className="field mt-4 ml-5">
            <label className="label">Filter Tahun:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Masukkan tahun"
                value={filterTahun}
                onChange={handleTahunChange}
              />
            </div>
          </div>
          <div className="field mt-4 ml-5">
            <label className="label">Filter Nama:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Masukkan nama pegawai"
                value={filterNama}
                onChange={handleNamaChange}
              />
            </div>
          </div>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Tahun</th>
              <th>Bulan</th>
              <th>Nama Pegawai</th>
              <th>Nama Jabatan</th>
              <th>Jenis Kelamin</th>
              <th>Hadir</th>
              <th>Sakit</th>
              <th>Alpha</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataKehadiran.map((kehadiran, index) => (
              <tr key={kehadiran.id}>
                <td>{index + 1}</td>
                <td>{kehadiran.tahun}</td>
                <td>{kehadiran.bulan}</td>
                <td>
                  <Link
                    to={`/data-pegawai/detail/name/${kehadiran.nama_pegawai}`}
                    className="has-text-link"
                  >
                    {kehadiran.nama_pegawai}
                  </Link>
                </td>{" "}
                <td>{kehadiran.jabatan_pegawai}</td>
                <td>{kehadiran.jenis_kelamin}</td>
                <td>{kehadiran.hadir}</td>
                <td>{kehadiran.sakit}</td>
                <td>{kehadiran.alpha}</td>
                <td>
                  <Link
                    to={`/data-kehadiran/edit/${kehadiran.id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDataKehadiran(kehadiran.id)}
                    className="button is-small is-danger ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataKehadiranList;
