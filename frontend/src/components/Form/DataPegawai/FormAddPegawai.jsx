import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <section className='mt-2 mr-5 ml-5'>
            <div className='header p-5 has-background-info'>
                <h2 className=" has-text-weight-bold has-text-white">Tambah Data Pegawai</h2>
            </div>
            <div className="card is-shadowless p-2">
                <card className="content">
                <div className="content">
                    <form onSubmit={saveDataPegawai}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="columns">
                        <div className="column">
                        <div className="field">
                            <label className="label">Nama Pegawai</label>
                            <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={namaPegawai}
                                onChange={(e) => setNamaPegawai(e.target.value)}
                                required='true'
                                placeholder='nama pegawai'
                            />
                            </div>
                        </div>
                        </div>
                        <div className="column">
                        <div className="field">
                            <label className="label">NIK</label>
                            <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                required='true'
                                placeholder='nomor NIK'
                            />
                            </div>
                        </div>
                        </div>
                        <div className="column">
                        <div className="field">
                            <label className="label">Jabatan</label>
                            <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={jabatan}
                                onChange={(e) => setJabatan(e.target.value)}
                                required='true'
                                placeholder='jabatan pegawai'
                            />
                            </div>
                        </div>
                        </div>
                        <div className="column">
                        <div className="field">
                            <label className="label">Jenis Kelamin</label>
                            <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                required='true'
                                placeholder='jenis kelamin pegawai'
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required='true'
                            placeholder='username pegawai'
                        />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required='true'
                            placeholder='*****'
                        />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                        <input
                            type="password"
                            className="input"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            required='true'
                            placeholder='*****'
                        />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                        <div className="field">
                            <label className="label">Hak Akses</label>
                            <div className="select is-fullwidth">
                            <select
                                value={hak_akses}
                                onChange={(e) => setHakAkses(e.target.value)}
                                required='true'
                            >
                                <option>-- pilih hak akses --</option>
                                <option value="admin">Admin</option>
                                <option value="pegawai">Pegawai</option>
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="label">Tanggal Masuk</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={tanggalMasuk}
                                        onChange={(e) => setTanggalMasuk(e.target.value)}
                                        required='true'
                                        placeholder='tanggal masuk pegawai'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                        <div className="field">
                            <label className="label">Status</label>
                            <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required='true'
                                placeholder='status pegawai'
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="field">
                            <label className="label">Photo</label>
                            <div className="file has-name">
                                <label className="file-label">
                                <input
                                    className="file-input"
                                    type="file"
                                    onChange={loadImage}
                                />
                                <span className="file-cta">
                                    <span className="file-label">Choose a file...</span>
                                </span>
                                <span>
                                {preview ? (
                                    <figure className="image is-128x128">
                                        <img src={preview} alt="Preview" />
                                    </figure>
                                    ) : ("")}
                                </span>
                                </label>
                            </div>
                        </div>
                        <div className="columns p-5">
                            <div className="column">
                                <div className="field">
                                    <div className="control">
                                        <button type='submit' className="button is-success">Save</button>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-12">
                                <div className="field">
                                        <div className="control">
                                            <Link to={'/data_pegawai'} type='button' className="button is-link">Kembali</Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                </card>
            </div>
        </section>
    )
}

export default FormAddPegawai