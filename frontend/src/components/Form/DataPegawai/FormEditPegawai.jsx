import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

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
                const response = await axios.get(`http://localhost:5000/data-pegawai/${id}`);
                setNik(response.data.nik);
                setNamaPegawai(response.data.nama_pegawai);
                setUsername(response.data.username);
                setJenisKelamin(response.data.jenis_kelamin);
                setJabatan(response.data.jabatan);
                setStatus(response.data.status);
                setHakAkses(response.data.hak_akses);

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
            const response = await axios.patch(`http://localhost:5000/data-pegawai/${id}`, {
                nik             : nik,
                nama_pegawai    : namaPegawai,
                username        : username,
                jenis_kelamin   : jenisKelamin,
                jabatan         : jabatan,
                status          : status,
                hak_akses       : hakAkses,
            });
            setMsg(response.data.msg)
            setTimeout(() => {
                navigate('/data-pegawai');
            }, 3000)
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

  return (
    <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white">Tambah Data Pegawai</h2>
        </div>
        <div className="card is-shadowless p-3">
            <card className="content">
                <div className="content">
                    <form onSubmit={updateUser}>
                        <p className='has-text-centered'>{msg}</p>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                <label className="label">Nama Pegawai</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={namaPegawai}
                                        onChange={(e) => setNamaPegawai(e.target.value)}
                                        required='true'
                                        placeholder='nama pegawai'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">NIk</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={nik}
                                        onChange={(e) => setNik(e.target.value)}
                                        required='true'
                                        placeholder='nomor NIK'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Jabatan</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={jabatan}
                                        onChange={(e) => setJabatan(e.target.value)}
                                        required='true'
                                        placeholder='jabatan pegawai'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Jenis Kelamin</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={jenisKelamin}
                                        onChange={(e) => setJenisKelamin(e.target.value)}
                                        required='true'
                                        placeholder='jenis kelamin pegawai'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required='true'
                                        placeholder='username pegawai'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Status</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required='true'
                                        placeholder='status pegawai'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Hak Akses</label>
                            <div className="select is-fullwidth">
                                <select
                                value={hakAkses}
                                onChange={(e) => setHakAkses(e.target.value)}>
                                    <option>-- pilih hak akses --</option>
                                    <option value="admin">Admin</option>
                                    <option value="pegawai">Pegawai</option>
                                </select>
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
                                            <Link to={'/data-pegawai'} type='button' className="button is-link">Kembali</Link>
                                        </div>
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

export default FormEditPegawai