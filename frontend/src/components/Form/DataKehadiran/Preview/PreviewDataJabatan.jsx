import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreviewDataJabatan = () => {

    const [dataJabatan, setDataJabatan] = useState([]);

    const getDataJabatan = async () => {
        const response = await axios.get("http://localhost:5000/data-jabatan");
        setDataJabatan(response.data);
    }

    useEffect(() => {
        getDataJabatan();
    }, []);

  return (
    <section className="section">
        <div className='container'>
        <div className='header mt-2 has-background-success is-flex is-justify-content-space-between'>
            <h1 className="p-3 has-text-white has-text-weight-bold">Preview Data Jabatan</h1>
        </div>
            <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Jabatan</th>
                </tr>
            </thead>
            <tbody>
                {dataJabatan.map((jabatan, index) => (
                <tr key={jabatan.id}>
                    <td>{index + 1}</td>
                    <td>{jabatan.nama_jabatan}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </section>
  )
}

export default PreviewDataJabatan