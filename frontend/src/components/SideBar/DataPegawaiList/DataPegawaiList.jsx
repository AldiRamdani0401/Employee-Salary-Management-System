import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DataPegawaiList = () => {

    const [dataPegawai, setDataPegawai] = useState([]);

    const getDataPegawai = async () => {
        const response = await axios.get("http://localhost:5000/data_pegawai");
        setDataPegawai(response.data);
    }
    
    useEffect(() => {
        getDataPegawai();
    }, []);


    const deleteDataPegawai = async(id) => {
        await axios.delete(`http://localhost:5000/data_pegawai/${id}`);
        getDataPegawai();
    }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Data Pegawai</h1>
        <h2 className="subtitle">Daftar Data Pegawai</h2>
        <Link to="/data_pegawai/add" className="button is-primary mb-3">
          Tambah Data
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama Pegawai</th>
              <th>Jabatan</th>
              <th>Hak Akses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPegawai.map((pegawai, index) => (
              <tr key={pegawai.id}>
                <td>{index + 1}</td>
                <td>{pegawai.nik}</td>
                <td>{pegawai.nama_pegawai}</td>
                <td>{pegawai.jabatan}</td>
                <td>{pegawai.hak_akses}</td>
                <td>
                  <Link
                    to={`/data_pegawai/edit/${pegawai.id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDataPegawai(pegawai.id)}
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
}

export default DataPegawaiList