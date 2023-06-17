import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const FormAddDataPotongan = () => {

    const [potongan, setPotongan] = useState("");
    const [jmlPotongan, setJmlPotongan] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveDataPotongan = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/data-potongan", {
                potongan        : potongan,
                jml_potongan    : jmlPotongan
            });
            setMsg("Berhasil Menambahkan Data Potongan");
            setTimeout(() => {
                navigate("/data-potongan");
            }, 2000)
        } catch (error) {
            if (error.message){
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white">Tambah Data Potongan</h2>
        </div>
        <div className="card is-shadowless p-2">
            <card className="content">
                <div className="content">
                    <form onSubmit={saveDataPotongan}>
                        <div className='p-2'>
                            <p className='has-text-centered has-text-success has-text-weight-bold'>{msg}</p>
                        </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Nama Potongan</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={potongan}
                                        onChange={(e) => setPotongan(e.target.value)}
                                        required='true'
                                        placeholder='nama potongan'/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Jumlah Potongan</label>
                                    <div className="control">
                                        <input type="text" className="input"
                                        value={jmlPotongan}
                                        onChange={(e) => setJmlPotongan(e.target.value)}
                                        required='true'
                                        placeholder='jumlah potongan'/>
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
                                            <Link to={'/data-potongan'} type='button' className="button is-link">Kembali</Link>
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

export default FormAddDataPotongan