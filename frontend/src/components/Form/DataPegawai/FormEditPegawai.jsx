import React from 'react'

const FormEditPegawai = () => {
  return (
<div>
        <h1 className="title">Data Pegawai</h1>
        <h2 className="subtitle">Edit Data Pegawai</h2>
        <div className="card is-shadowless">
            <card className="content">
                <div className="content">
                    <form>
                        <div className="field">
                            <label className="label">Nama Pegawai</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='nama pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">NIk</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='nomor NIK'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Jabatan</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='jabatan pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Jenis Kelamin</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='jenis kelamin pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='username pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Hak Akses</label>
                            <div className="select is-fullwidth">
                                <select>
                                    <option value="admin">Admin</option>
                                    <option value="pegawai">Pegawai</option>
                                </select>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success">Update</button>
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