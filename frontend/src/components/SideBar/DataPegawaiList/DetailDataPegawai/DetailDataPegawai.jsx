import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DetailDataPegawai = () => {
  const [dataPegawai, setDataPegawai] = useState(null);
  const { id } = useParams();
  const { nama } = useParams();

  useEffect(() => {
    const getDataPegawaiById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data-pegawai/${id}`
        );
        const data = response.data;
        setDataPegawai(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataPegawaiById();
  }, [id]);

  useEffect(() => {
    const getDataPegawaiByName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data-pegawai/name/${nama}`
        );
        const data = response.data;
        setDataPegawai(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataPegawaiByName();
  }, [nama]);

  return (
    <section className="mt-2 mr-5 ml-5">
      <div className="header p-5 has-background-info">
        <h2 className="has-text-weight-bold has-text-white">
          Detail Data Pegawai
        </h2>
      </div>
      {dataPegawai && (
        <div className="card is-shadowless p-2">
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column">
                  <table className="table is-bordered is-striped is-narrow is-hoverable">
                    <tbody>
                      <tr>
                        <th>NIK</th>
                        <td>{dataPegawai.nik}</td>
                      </tr>
                      <tr>
                        <th>Nama Pegawai</th>
                        <td>{dataPegawai.nama_pegawai}</td>
                      </tr>
                      <tr>
                        <th>Username</th>
                        <td>{dataPegawai.username}</td>
                      </tr>
                      <tr>
                        <th>Jenis Kelamin</th>
                        <td>{dataPegawai.jenis_kelamin}</td>
                      </tr>
                      <tr>
                        <th>Jabatan</th>
                        <td>{dataPegawai.jabatan}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{dataPegawai.status}</td>
                      </tr>
                      <tr>
                        <th>Hak Akses</th>
                        <td>{dataPegawai.hak_akses}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="column">
                  <table className="table is-bordered is-striped is-narrow is-hoverable" style={{ width: "200px", height: "200px" }} >
                    <tbody>
                      <tr>
                        <th className="has-text-centered">Photo Pegawai</th>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <img
                            src={`http://localhost:5000/images/${dataPegawai.photo}`}
                            alt="User"
                            className="photo"
                            style={{ width: "180px", height: "180px" }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <Link
                    to={"/data-pegawai"}
                    type="button"
                    className="button is-link"
                  >
                    Kembali
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailDataPegawai;
