import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  const [dataPegawai, setDataPegawai] = useState(null);

  useEffect(() => {
    const getDataPegawai = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data-pegawai/name/${user.nama_pegawai}`
        );
        const data = response.data;
        setDataPegawai(data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataPegawai();
  }, [user]);

  return (
    <section className="mr-3">
      <div className="header mt-2 mb-2 p-5 has-background-link">
        <h1 className="title p-3 has-text-white">Dashboard</h1>
      </div>
      <div className="columns p-5">
        <div className="column">
          <figure
            className="box border"
            style={{ width: "220px", height: "230" }}
          >
            {dataPegawai && (
              <table className="table is-bordered is-striped is-narrow is-hoverable">
                <tbody>
                  <tr>
                    <td colSpan={2} className="p-2">
                      <h2 className="subtitle has-text-centered">
                        <strong>{user && user.hak_akses}</strong>
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-2">
                      <img
                        src={`http://localhost:5000/images/${dataPegawai.photo}`}
                        alt="User"
                        className="photo"
                        style={{ width: "200px", height: "200px" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>ID</td>
                    <td>{dataPegawai.id}</td>
                  </tr>
                  <tr>
                    <td>NIK</td>
                    <td>{dataPegawai.nik}</td>
                  </tr>
                  <tr>
                    <td>Nama Pegawai</td>
                    <td>{dataPegawai.nama_pegawai}</td>
                  </tr>
                  <tr>
                    <td>Jabatan</td>
                    <td>{dataPegawai.jabatan}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
