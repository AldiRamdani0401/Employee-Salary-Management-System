import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormEditJabatan = () => {

    const [namaJabatan, setNamaJabatan] = useState('');
    const [gajiPokok, setGajiPokok] = useState('');
    const [tjTransport, setTjTransport] = useState('');
    const [uangMakan, setUangMakan] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data_jabatan/id/${id}`);
                setNamaJabatan(response.data.nama_jabatan);
                setGajiPokok(response.data.gaji_pokok);
                setTjTransport(response.data.tj_transport);
                setUangMakan(response.data.uang_makan);
            } catch (error) {
                if (error.response){
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    }, [id]);

    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/data_jabatan/${id}`, {
                nama_jabatan        : namaJabatan,
                gaji_pokok          : gajiPokok,
                tj_transport        : tjTransport,
                uang_makan          : uangMakan
            });
            navigate('/data_jabatan');
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

  return (
    <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white">Edit Data Jabatan</h2>
        </div>
        <div className="card is-shadowless p-2">
            <card className="content">
                <div className="content">
                    <form onSubmit={updateData}>
                        <p className='has-text-centered'>{msg}</p>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Nama Jabatan</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={namaJabatan}
                                        onChange={(e) => setNamaJabatan(e.target.value)}
                                        required='true'
                                        placeholder='nama jabatan'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Gaji Pokok</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={gajiPokok}
                                        onChange={(e) => setGajiPokok(e.target.value)}
                                        required='true'
                                        placeholder='gaji pokok pegawai'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Tunjangan Transport</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={tjTransport}
                                        onChange={(e) => setTjTransport(e.target.value)}
                                        required='true'
                                        placeholder='tunjangan transport'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Uang Makan</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={uangMakan}
                                        onChange={(e) => setUangMakan(e.target.value)}
                                        required='true'
                                        placeholder='uang makan pegawai'/>
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
                                            <Link to={'/data_jabatan'} type='button' className="button is-link">Kembali</Link>
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

export default FormEditJabatan