import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditPegawai = () => {

    const [nik, setNik] = useState("");
    const [namaPegawai, setNamaPegawai] = useState("");
    const [username, setUsername] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [status, setStatus] = useState("");
    const [hakAkses, setHakAkses] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data_pegawai/id/${id}`);
                setNik(response.data.nik);
                setNamaPegawai(response.data.nama_pegawai);
                setUsername(response.data.username);
                setJenisKelamin(response.data.jenis_kelamin);
                setJabatan(response.data.jabatan);
                setStatus(response.data.status);
                setHakAkses(response.data.hak_akses);

                console.log(response);
            } catch (error) {
                if (error.response){
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/data_pegawai/${id}`, {
                nik             : nik,
                nama_pegawai    : namaPegawai,
                username        : username,
                jenis_kelamin   : jenisKelamin,
                jabatan         : jabatan,
                status          : status,
                hak_akses       : hakAkses,
            });
            navigate('/data_pegawai');
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

  return (
<div>
        <h1 className="title">Data Pegawai</h1>
        <h2 className="subtitle">Edit Data Pegawai</h2>
        <div className="card is-shadowless">
            <card className="content">
                <div className="content">
                    <form onSubmit={updateUser}>
                        <p className='has-text-centered'>{msg}</p>
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
                            <label className="label">Status</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                placeholder='status pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Hak Akses</label>
                            <div className="select is-fullwidth">
                                <select
                                value={hakAkses}
                                onChange={(e) => setHakAkses(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="pegawai">Pegawai</option>
                                </select>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type='submit' className="button is-success">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </card>
        </div>
    </div>
  )
}

export default FormEditPegawai