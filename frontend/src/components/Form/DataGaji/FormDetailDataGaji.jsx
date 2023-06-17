import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormDetailDataGaji = () => {

    const [tahun, setTahun] = useState('');
    const [bulan, setBulan] = useState('');
    const [nik, setNik] = useState('');
    const [namaPegawai, setNamaPegawai] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [gajiPokok, setGajiPokok] = useState('');
    const [tjTransport, setTjTransport] = useState('');
    const [uangMakan, setUangMakan] = useState('');
    const [potongan, setPotongan] = useState('');
    const [total, setTotal] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data-gaji/${id}`);
                setTahun(response.data.tahun);
                setBulan(response.data.bulan);
                setNik(response.data.nik);
                setNamaPegawai(response.data.nama_pegawai);
                setJabatan(response.data.jabatan);
                setGajiPokok(response.data.gaji_pokok);
                setTjTransport(response.data.tj_transport);
                setUangMakan(response.data.uang_makan);
                setPotongan(response.data.potongan);
                setTotal(response.data.total);
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
            await axios.patch(`http://localhost:5000/data-gaji/${id}`, {
                tahun               : tahun,
                bulan               : bulan,
                nik                 : nik,
                nama_pegawai        : namaPegawai,
                jabatan_pegawai     : jabatan,
                gaji_pokok          : gajiPokok,
                tj_transport        : tjTransport,
                uang_makan          : uangMakan,
                potongan            : potongan,
                total               : total,
            });
            navigate('/data-gaji');
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }

  return (
    <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white">Detail Gaji Pegawai</h2>
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
                                        value={namaPegawai}
                                        onChange={(e) => setJabatan(e.target.value)}
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
                                            <Link to={'/data-gaji'} type='button' className="button is-link">Kembali</Link>
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

export default FormDetailDataGaji