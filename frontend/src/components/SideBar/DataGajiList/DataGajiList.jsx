import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DataGajiList = () => {
  const [dataGaji, setDataGaji] = useState([]);

  const getDataGaji = async () => {
    const response = await axios.get("http://localhost:5000/data-gaji");
    setDataGaji(response.data);
  };

  useEffect(() => {
    getDataGaji();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="header mt-2 p-5 has-background-link is-flex is-justify-content-space-between">
          <h1 className="title p-3 has-text-white">Data Gaji</h1>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Tahun</th>
              <th>Bulan</th>
              <th>NIK</th>
              <th>Nama Pegawai</th>
              <th>Jabatan</th>
              <th>Gaji Pokok</th>
              <th>Tj. Transport</th>
              <th>Uang Makan</th>
              <th>Potongan</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataGaji.map((data, index) => (
              data.tahun !== 0 && data.bulan !== 0 && (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.tahun}</td>
                  <td>{data.bulan}</td>
                  <td>{data.nik}</td>
                  <td>{data.nama_pegawai}</td>
                  <td>{data.jabatan}</td>
                  <td>{data.gaji_pokok}</td>
                  <td>{data.tj_transport}</td>
                  <td>{data.uang_makan}</td>
                  <td>{data.potongan}</td>
                  <td>{data.total}</td>
                  <td>
                    <Link
                      to={`/data-gaji/name/${data.nama_pegawai}`}
                      className="button is-small is-info"
                    >
                      Lihat
                    </Link>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataGajiList;