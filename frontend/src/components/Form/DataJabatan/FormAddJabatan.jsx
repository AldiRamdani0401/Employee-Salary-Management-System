import React from 'react'

const FormAddJabatan = () => {
  return (
    <div>
        <h1 className="title">Data Jabatan</h1>
        <h2 className="subtitle">Tambah Data Jabatan</h2>
        <div className="card is-shadowless">
            <card className="content">
                <div className="content">
                    <form>
                        <div className="field">
                            <label className="label">Nama Jabatan</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='nama jabatan'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Gaji Pokok</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='gaji pokok pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Tunjangan Transport</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='tunjangan transport'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Uang Makan</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='uang makan pegawai'/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-success">Save</button>
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