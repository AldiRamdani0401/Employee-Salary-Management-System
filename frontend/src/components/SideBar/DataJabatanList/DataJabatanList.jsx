import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {IoMedalOutline} from 'react-icons/io5';

const DataJabatanList = () => {

    const [dataJabatan, setDataJabatan] = useState([]);

    const getDataJabatan = async () => {
        const response = await axios.get("http://localhost:5000/data-jabatan");
        setDataJabatan(response.data);
    }

    useEffect(() => {
        getDataJabatan();
    }, []);

    const deleteDataJabatan = async (id) => {
        await axios.delete(`http://localhost:5000/data-jabatan/${id}`);
        getDataJabatan();
    }

  return (
    <section className="section">
        <div className='container'>
        <div className='header mt-2 p-5 has-background-link is-flex is-justify-content-space-between'>
            <h1 className="title p-3 has-text-white"><IoMedalOutline size='30px'/>  Data Jabatan</h1>
                <Link to="/data-jabatan/add" className="button is-success mt-4">
                Tambah Data
                </Link>
        </div>
            <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Jabatan</th>
                    <th>Gaji Pokok</th>
                    <th>Tj.Transport</th>
                    <th>Uang Makan</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataJabatan.map((jabatan, index) => (
                <tr key={jabatan.id}>
                    <td>{index + 1}</td>
                    <td>{jabatan.nama_jabatan}</td>
                    <td>{jabatan.gaji_pokok.toLocaleString()}</td>
                    <td>{jabatan.tj_transport.toLocaleString()}</td>
                    <td>{jabatan.uang_makan.toLocaleString()}</td>
                    <td>
                        <Link to={`/data-jabatan/edit/${jabatan.id}`}
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