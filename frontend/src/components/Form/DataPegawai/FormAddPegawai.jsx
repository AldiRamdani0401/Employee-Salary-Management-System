import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddPegawai = () => {

    const [nik, setNik] = useState("");
    const [namaPegawai, setNamaPegawai] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [tanggalMasuk, setTanggalMasuk] = useState("");

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");

    const [status, setStatus] = useState("");
    const [hak_akses, setHakAkses] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
          setTitle(image.name);
          setFile(image);
          setPreview(URL.createObjectURL(image));
      };

    const saveDataPegawai = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("title", title);
        formData.append("nik", nik);
        formData.append("nama_pegawai", namaPegawai);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("confPassword", confPassword);
        formData.append("jenis_kelamin", jenisKelamin);
        formData.append("jabatan", jabatan);
        formData.append("tanggal_masuk", tanggalMasuk);
        formData.append("status", status);
        formData.append("hak_akses", hak_akses);

        try {
          await axios.post("http://localhost:5000/data_pegawai", formData, {
            headers: {
              "Content-type": "multipart/form-data"
            }
          });
          navigate("/data_pegawai");
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }

  return (
    <div>
        <h1 className="title">Data Pegawai</h1>
        <h2 className="subtitle">Tambah Data Pegawai</h2>
        <div className="card is-shadowless">
            <card className="content">
                <div className="content">
                    <form onSubmit={saveDataPegawai}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">Nama Pegawai</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={namaPegawai}
                                onChange={(e) => setNamaPegawai(e.target.value)}
                                placeholder='nama pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">NIk</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                placeholder='nomor NIK'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Jabatan</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={jabatan}
                                onChange={(e) => setJabatan(e.target.value)}
                                placeholder='jabatan pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Jenis Kelamin</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                placeholder='jenis kelamin pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='username pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Photo</label>
                            <div className="control">
                                <input
                                type="file"
                                className="file-input"
                                onChange={loadImage}
                                />
                                <span className="file-cta">
                                <span className="file-label">Choose a file...</span>
                                </span>
                            </div>
                        </div>
                    {preview ? (
                        <figure className="image is-128x128">
                        <img src={preview} alt="Preview" />
                        </figure>
                    ) : (
                        ""
                    )}
                        <div className="field">
                            <label className="label">Status</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                placeholder='username pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Tanggal Masuk</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={tanggalMasuk}
                                onChange={(e) => setTanggalMasuk(e.target.value)}
                                placeholder='username pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input type="password" className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='*****'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                                <input type="password" className="input"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                placeholder='*****'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Hak Akses</label>
                            <div className="select is-fullwidth">
                                <select
                                value={hak_akses}
                                onChange={(e) => setHakAkses(e.target.value)}>
                                    <option>-- pilih hak akses --</option>
                                    <option value="admin">Admin</option>
                                    <option value="pegawai">Pegawai</option>
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type='submit' className="button is-success">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </card>
        </div>
    </div>
  )
}

export default FormAddPegawai