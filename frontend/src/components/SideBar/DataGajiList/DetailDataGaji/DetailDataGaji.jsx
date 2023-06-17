import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailDataGaji = () => {
  const [tahun, setTahun] = useState('');
  const [bulan, setBulan] = useState('');
  const [nik, setNik] = useState('');
  const [nama_pegawai, setNamaPegawai] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gaji_pokok, setGajiPokok] = useState('');
  const [tj_transport, setTjTransport] = useState('');
  const [uang_makan, setUangMakan] = useState('');
  const [potongan, setPotongan] = useState('');
  const [total, setTotal] = useState('');
  const { name } = useParams();

  useEffect(() => {
    const getDataPegawai = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/data-gaji/name/${name}`);
        const data = response.data; // Mendapatkan data dari respons

        // Mengatur state dengan data yang diterima
        setTahun(data.tahun);
        setBulan(data.bulan);
        setNik(data.nik);
        setNamaPegawai(data.nama_pegawai);
        setJabatan(data.jabatan);
        setGajiPokok(data.gaji_pokok);
        setTjTransport(data.tj_transport);
        setUangMakan(data.uang_makan);
        setPotongan(data.potongan);
        setTotal(data.total);
      } catch (error) {
        console.log(error);
      }
    };

    getDataPegawai();
  }, [name]);

  return (
    <section className='mt-2 mr-5 ml-5'>
      <div className='header p-5 has-background-info'>
        <h2 className='has-text-weight-bold has-text-white'>Detail Gaji Pegawai</h2>
      </div>
      <div className='card is-shadowless p-2'>
        <div className='card-content'>
          <div className='content'>
            <table className='table is-striped is-fullwidth'>
              <thead>
                <tr>
                  <th>Tahun</th>
                  <th>Bulan</th>
                  <th>NIK</th>
                  <th>Nama Pegawai</th>
                  <th>Jabatan</th>
                  <th>Gaji Pokok</th>
                  <th>Tj. Transport</th>
                  <th>Uang Makan</th>
                  <th>Potongan</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{tahun}</td>
                  <td>{bulan}</td>
                  <td>{nik}</td>
                  <td>{nama_pegawai}</td>
                  <td>{jabatan}</td>
                  <td>{gaji_pokok}</td>
                  <td>{tj_transport}</td>
                  <td>{uang_makan}</td>
                  <td>{potongan}</td>
                  <td>{total}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailDataGaji;
