import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreviewDataKehadiran = () => {

    const [dataKehadiran, setDataKehadiran] = useState([]);

    const getDataPegawai = async () => {
        const response = await axios.get("http://localhost:5000/data-kehadiran");
        setDataKehadiran(response.data);
    }

    useEffect(() => {
        getDataPegawai();
    }, []);


  return (
    <section className="section">
      <div className="container">
        <div className='header mt-2 has-background-primary is-flex is-justify-content-space-between'>
            <h1 className=" p-3 has-text-white has-text-weight-bold">Preview Data Kehadiran</h1>
        </div>
        <div>
            <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama Pegawai</th>
            </tr>
          </thead>
          <tbody>
            {dataKehadiran.map((pegawai, index) => (
              <tr key={pegawai.id}>
                <td>{index + 1}</td>
                <td>{pegawai.nik}</td>
                <td>{pegawai.nama_pegawai}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}

export default PreviewDataKehadiran