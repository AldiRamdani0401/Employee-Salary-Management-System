import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';

const FormAddDataPotongan = () => {

    const [potongan, setPotongan] = useState('');
    const [jmlPotongan, setJmlPotongan] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/data-potongan/${id}`);
                setPotongan(response.data.potongan);
                setJmlPotongan(response.data.jml_potongan);
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
            axios.patch(`http://localhost:5000/data-potongan/update/${id}`, {
                potongan        : potongan,
                jml_potongan    : jmlPotongan
            });
            setMsg("Data Updated !")
            setTimeout(() => {
                navigate("/data-potongan");
            }, 2000)
        } catch (error) {
            if (error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className='mt-2 mr-5 ml-5'>
        <div className='header p-5 has-background-info'>
            <h2 className=" has-text-weight-bold has-text-white">Edit Data Potongan</h2>
        </div>
        <div className="card is-shadowless p-2">
            <card className="content">
                <div className="content">
                    <form onSubmit={updateData}>
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