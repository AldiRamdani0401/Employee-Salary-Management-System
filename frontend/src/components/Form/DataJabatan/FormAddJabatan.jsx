import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormAddJabatan = () => {

    const [namaJabatan, setNamaJabatan] = useState("");
    const [gajiPokok, setGajiPokok] = useState("");
    const [tjTransport, setTjTransport] = useState("");
    const [uangMakan, setUangMakan] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveDataJabatan = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/data_jabatan",  {
                nama_jabatan    : namaJabatan,
                gaji_pokok      : gajiPokok,
                tj_transport    : tjTransport,
                uang_makan      : uangMakan

            });
            navigate("/data_jabatan");
        } catch (error) {
            if (error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
        <h1 className="title">Data Jabatan</h1>
        <h2 className="subtitle">Tambah Data Jabatan</h2>
        <div className="card is-shadowless">
            <card className="content">
                <div className="content">
                    <form onSubmit={saveDataJabatan}>
                        <p className='has-text-centered'>{msg}</p>
                        <div className="field">
                            <label className="label">Nama Jabatan</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={namaJabatan}
                                onChange={(e) => setNamaJabatan(e.target.value)}
                                placeholder='nama jabatan'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Gaji Pokok</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={gajiPokok}
                                onChange={(e) => setGajiPokok(e.target.value)}
                                placeholder='gaji pokok pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Tunjangan Transport</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={tjTransport}
                                onChange={(e) => setTjTransport(e.target.value)}
                                placeholder='tunjangan transport'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Uang Makan</label>
                            <div className="control">
                                <input type="text" className="input"
                                value={uangMakan}
                                onChange={(e) => setUangMakan(e.target.value)}
                                placeholder='uang makan pegawai'/>
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

export default FormAddJabatan