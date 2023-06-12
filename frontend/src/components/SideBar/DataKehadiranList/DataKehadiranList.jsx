import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {IoCalendarClearSharp} from 'react-icons/io5';

const DataKehadiranList = () => {

    const [dataKehadiran, setDataKehadiran] = useState([]);

    const getDataKehadiran = async () => {
        const response = await axios.get("http://localhost:5000/data_kehadiran");
        setDataKehadiran(response.data);
    }

    useEffect(() => {
        getDataKehadiran();
    }, []);

    const deleteDataKehadiran = async (id) => {
        await axios.delete(`http://localhost:5000/data_kehadiran/${id}`);
        getDataKehadiran();
    }

  return (
    <section className="section">
        <div className='container'>
        <div className='header mt-2 p-5 has-background-link is-flex is-justify-content-space-between'>
            <h1 className="title p-3 has-text-white"><IoCalendarClearSharp/> Data Kehadiran</h1>
                <Link to="/data_kehadiran/add" className="button is-success mt-4">
                Tambah Data
                </Link>
        </div>
            <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Bulan</th>
                    <th>Nama Pegawai</th>
                    <th>Nama Jabatan</th>
                    <th>Hadir</th>
                    <th>Sakit</th>
                    <th>Alpha</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataKehadiran.map((kehadiran, index) => (
                <tr key={kehadiran.id}>
                    <td>{index + 1}</td>
                    <td>{kehadiran.bulan}</td>
                    <td>{kehadiran.nama_pegawai}</td>
                    <td>{kehadiran.nama_jabatan}</td>
                    <td>{kehadiran.hadir}</td>
                    <td>{kehadiran.sakit}</td>
                    <td>{kehadiran.alpha}</td>
                    <td>
                        <Link to={`/data_kehadiran/edit/${kehadiran.id}`}
                        className='button is-small is-info'>Edit</Link>
                        <button onClick={() => deleteDataKehadiran(kehadiran.id)}
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

export default DataKehadiranList