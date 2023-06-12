import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {IoCut} from 'react-icons/io5';


const DataPotonganList = () => {

    const [dataPotongan, setDataPotongan] = useState([]);

    const getDataPotongan = async () => {
        const response = await axios.get("http://localhost:5000/data_potongan");
        setDataPotongan(response.data);
    }

    useEffect(() => {
        getDataPotongan();
    }, []);

    const deleteDataPotongan = async (id) => {
        await axios.delete(`http://localhost:5000/data_potongan/${id}`);
        getDataPotongan();
    }

  return (
        <section className="section">
        <div className='container'>
        <div className='header mt-2 p-5 has-background-link is-flex is-justify-content-space-between'>
            <h1 className="title p-3 has-text-white"><IoCut/> Data Potongan</h1>
                <Link to="/data_potongan/add" className="button is-success mt-4">
                Tambah Data
                </Link>
        </div>
            <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Potongan</th>
                    <th>Jumlah Potongan</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataPotongan.map((potongan, index) => (
                <tr key={potongan.id}>
                    <td>{index + 1}</td>
                    <td>{potongan.potongan}</td>
                    <td>{potongan.jml_potongan}</td>
                    <td>
                        <Link to={`/data_potongan/edit/${potongan.id}`}
                        className='button is-small is-info'>Edit</Link>
                        <button onClick={() => deleteDataPotongan(potongan.id)}
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

export default DataPotonganList