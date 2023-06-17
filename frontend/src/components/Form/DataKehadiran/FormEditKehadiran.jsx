import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {IoCreate} from 'react-icons/io5';

const FormEditKehadiran = () => {

    const [nik, setNik] = useState('');
    const [namaPegawai, setNamaPegawai] = useState('');
    const [namaJabatan, setNamaJabatan] = useState('');
    const [hadir, setHadir] = useState('');
    const [sakit, setSakit] = useState('');
    const [alpha, setAlpha] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data-kehadiran/${id}`);
                setNamaPegawai(response.data.nama_pegawai);
                setNik(response.data.nik);
                setNamaJabatan(response.data.nama_jabatan);
                setHadir(response.data.hadir);
                setSakit(response.data.sakit);
                setAlpha(response.data.alpha);
            } catch (error) {
                if (error.response){
                    setMsg(error.response.data.msg);
                }
            }
        }
        getDataById();
    }, [id]);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/data-kehadiran/${id}`,{
                nik             : nik,
                nama_pegawai    : namaPegawai,
                nama_jabatan    : namaJabatan,
                hadir           : hadir,
                sakit           : sakit,
                alpha           : alpha
            });
            setMsg(response.data.msg);
            navigate("/data-kehadiran");
        } catch (error) {
            if (error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white"><IoCreate size='22px'/> Edit Data Kehadiran</h2>
        </div>
        <div className="card is-shadowless p-2">
            <card className="content">
                <div className="content">
                    <form onSubmit={updateData}>
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
                                            <Link to={'/data-kehadiran'} type='button' className="button is-link">Kembali</Link>
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

export default FormEditKehadiran