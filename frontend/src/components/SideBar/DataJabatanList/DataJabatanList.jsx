import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DataJabatanList = () => {

    const [dataJabatan, setDataJabatan] = useState([]);

    const getDataJabatan = async () => {
        const response = await axios.get("http://localhost:5000/data_jabatan");
        setDataJabatan(response.data);
    }

    useEffect(() => {
        getDataJabatan();
    }, []);

    const deleteDataJabatan = async (id) => {
        await axios.delete(`http://localhost:5000/data_jabatan/${id}`);
        getDataJabatan();
    }

  return (
    <section className="section">
        <div className='container'>
            <h1 className="title">Data Jabatan</h1>
            <h2 className="subtitle">Daftar Data Jabatan</h2>
            <Link to="/data_jabatan/add" className="button is-primary mb-3">Tambah Data</Link>
            <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Jabatan</th>
                    <th>Gaji Pokok</th>
                    <th>Tj.Transport</th>
                    <th>Uang Makan</th>
                </tr>
            </thead>
            <tbody>
                {dataJabatan.map((jabatan, index) => (
                <tr key={jabatan.id}>
                    <td>{index + 1}</td>
                    <td>{jabatan.nama_jabatan}</td>
                    <td>{jabatan.gaji_pokok}</td>
                    <td>{jabatan.tj_transport}</td>
                    <td>{jabatan.uang_makan}</td>
                    <td>
                        <Link to={`/data_jabatan/edit/${jabatan.id}`}
                        className='button is-small is-info'>Edit</Link>
                        <button onClick={() => deleteDataJabatan(jabatan.id)}
                        className='button is-small is-danger ml-2'>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </section>
  )
}

export default DataJabatanList