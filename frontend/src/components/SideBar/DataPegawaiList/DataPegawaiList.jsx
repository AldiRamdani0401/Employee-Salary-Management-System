import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoPeopleSharp } from 'react-icons/io5';

const DataPegawaiList = () => {
  const [dataPegawai, setDataPegawai] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const getDataPegawai = async () => {
    const response = await axios.get("http://localhost:5000/data-pegawai");
    setDataPegawai(response.data);
  }

  useEffect(() => {
    getDataPegawai();
  }, []);

  const deleteDataPegawai = async (id) => {
    await axios.delete(`http://localhost:5000/data-pegawai/${id}`);
    getDataPegawai();
  }

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  }

  const filteredDataPegawai = dataPegawai.filter((pegawai) => {
    const { nik, nama_pegawai, jabatan } = pegawai;
    const keyword = searchKeyword.toLowerCase();
    return (
      nik.toLowerCase().includes(keyword) ||
      nama_pegawai.toLowerCase().includes(keyword) ||
      jabatan.toLowerCase().includes(keyword)
    );
  });

  return (
    <section className="section">
      <div className="container">
        <div className='header p-5 has-background-link is-flex is-justify-content-space-between'>
          <h1 className="title p-3 has-text-white"><IoPeopleSharp size='30px' /> Data Pegawai</h1>
          <Link to="/data-pegawai/add" className="button is-success mt-4">
            Tambah Data
          </Link>
        </div>
        <div>
          <div className="field mt-4">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Cari berdasarkan NIK, Nama Pegawai, atau Jabatan"
                value={searchKeyword}
                onChange={handleSearch}
              />
            </div>
          </div>
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
              {filteredDataPegawai.map((pegawai, index) => (
                <tr key={pegawai.id}>
                  <td>{index + 1}</td>
                  <td>{pegawai.nik}</td>
                  <td>{pegawai.nama_pegawai}</td>
                  <td>{pegawai.jabatan}</td>
                  <td>{pegawai.hak_akses}</td>
                  <td>
                    <Link
                      to={`/data-pegawai/edit/${pegawai.id}`}
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
      </div>
    </section>
  );
}

export default DataPegawaiList;
