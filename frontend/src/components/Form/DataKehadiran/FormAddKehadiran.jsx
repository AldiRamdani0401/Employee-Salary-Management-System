import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PreviewDataPegawai from './Preview/PreviewDataPegawai'
import PreviewDataJabatan from './Preview/PriviewDataJabatan'

const FormAddKehadiran = () => {

    const [nik, setNik] = useState("");
    const [namaPegawai, setNamaPegawai] = useState("");
    const [namaJabatan, setNamaJabatan] = useState("");
    const [hadir, setHadir] = useState("");
    const [sakit, setSakit] = useState("");
    const [alpha, setAlpha] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveDataJabatan = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/data_kehadiran",  {
                nik             : nik,
                nama_pegawai    : namaPegawai,
                nama_jabatan    : namaJabatan,
                hadir           : hadir,
                sakit           : sakit,
                alpha           : alpha
            });
            navigate("/data_kehadiran");
        } catch (error) {
            if (error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white">Tambah Data Kehadiran</h2>
        </div>
        <div className="card is-shadowless p-2">
            <card className="content">
                <div className="content">
                    <form onSubmit={saveDataJabatan}>
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
                                    <label className="label">NIK</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={nik}
                                        onChange={(e) => setNik(e.target.value)}
                                        required='true'
                                        placeholder='nik pegawai'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Nama Jabatan</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={namaJabatan}
                                        onChange={(e) => setNamaJabatan(e.target.value)}
                                        required='true'
                                        placeholder='jabatan pegawai'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">hadir</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={hadir}
                                        onChange={(e) => setHadir(e.target.value)}
                                        required='true'
                                        placeholder='hadir pegawai'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Sakit</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={sakit}
                                        onChange={(e) => setSakit(e.target.value)}
                                        required='true'
                                        placeholder='sakit pegawai'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Alpha</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={alpha}
                                        onChange={(e) => setAlpha(e.target.value)}
                                        required='true'
                                        placeholder='sakit pegawai'/>
                                    </div>
                                </div>
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
                                            <Link to={'/data_kehadiran'} type='button' className="button is-link">Kembali</Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </card>
        </div>
        <div className="columns">
            <div className="column">
                <PreviewDataPegawai/>
            </div>
            <div className="column">
                <PreviewDataJabatan/>
            </div>
        </div>
    </section>
  )
}

export default FormAddKehadiran