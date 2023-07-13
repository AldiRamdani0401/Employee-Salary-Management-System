import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPeopleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SlipGajiList = () => {
  const navigate = useNavigate();
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchName, setSearchName] = useState("");
  const [dataYear, setDataYear] = useState([]);
  const [dataName, setDataName] = useState([]);

  const [foundData, setFoundData] = useState(null);
  const [dataNotFound, setDataNotFound] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const getSlipGajiByYear = async (year, onDataFound) => {
    try {
      const tahun = await axios.get(
        `http://localhost:5000/laporan/slip-gaji/year/${year}`
      );
      setDataYear(tahun.data);
      setFoundData(tahun.data); // Set the found data in the state

      const nameExists = dataPegawai.some(data => data.nama_pegawai === searchName);
      if (!nameExists) {
        setDataNotFound(true);
      }

      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 404) {
          setDataNotFound(true);
        } else {
          console.log("Terjadi kesalahan saat memuat data.");
        }
      }
    }
  };

  const getSlipGajiByMonth = async (month, onDataFound) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/laporan/slip-gaji/month/${month}`
      );
      setFoundData(response.data); // Set the found data in the state

      const nameExists = dataPegawai.some(data => data.nama_pegawai === searchName);
      if (!nameExists) {
        setDataNotFound(true);
      }

      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 404) {
          setDataNotFound(true);
        } else {
          console.log("Terjadi kesalahan saat memuat data.");
        }
      }
    }
  };

  const getSlipGajiByName = async (name, onDataFound) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/laporan/slip-gaji/name/${name}`
      );
      setFoundData(response.data); // Set the found data in the state

      const nameExists = dataPegawai.some(data => data.nama_pegawai === searchName);
      if (!nameExists) {
        setDataNotFound(true);
      }

      onDataFound();
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 404) {
          setDataNotFound(true);
        } else {
          console.log("Terjadi kesalahan saat memuat data.");
        }
      }
    }
  };

  const [dataPegawai, setDataPegawai] = useState([]);

  const getDataPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data-pegawai");
      setDataPegawai(response.data);
    } catch (error) {
      console.log("Terjadi kesalahan saat memuat data pegawai.");
    }
  };

  useEffect(() => {
    getDataPegawai();
  }, []);

  const handleSearchMonth = (event) => {
    setSearchMonth(event.target.value);
  };

  const handleSearchYear = (event) => {
    setSearchYear(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const selectedMonth = searchMonth;
    const selectedYear = searchYear;
    const selectedName = searchName;

    let yearDataFound = false;
    let monthDataFound = false;
    let nameDataFound = false;

    await Promise.all([
      getSlipGajiByYear(selectedYear, () => (yearDataFound = true)),
      getSlipGajiByMonth(selectedMonth, () => (monthDataFound = true)),
      getSlipGajiByName(selectedName, () => (nameDataFound = true)),
    ]);

    setShowMessage(true);

    if (yearDataFound && monthDataFound && nameDataFound) {
      setShowMessage(false);
      navigate(
        `/laporan/slip-gaji/print-page?month=${selectedMonth}&year=${selectedYear}&name=${selectedName}`
      );
    } else {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const yearOptions = [];
  for (let year = 2000; year <= 2100; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  const nameOptions = dataPegawai.map((pegawai) => (
    <option key={pegawai.id} value={pegawai.nama_pegawai}>
      {pegawai.nama_pegawai}
    </option>
  ));

  return (
    <section className="mt-2 mr-5 ml-5">
      <div className="container">
        <div className="header p-5 has-background-link is-flex is-justify-content-space-between">
          <h1 className="title p-3 has-text-white">
            <IoPeopleSharp size="30px" /> Slip Gaji Pegawai
          </h1>
        </div>
        <div className="card is-shadowless mt-2 p-3">
          <div className="p-1">
            <label className="label has-text-black">
              Filter Slip Gaji Pegawai
            </label>
            <hr />
            <form onSubmit={handleSearch}>
              {showMessage && (
                <div className="notification is-danger">
                  Data tidak ditemukan
                </div>
              )}
              <div className="field mt-4">
                <label className="label">Bulan</label>
                <div className="control">
                  <select
                    className="select is-fullwidth"
                    value={searchMonth}
                    onChange={handleSearchMonth}
                    required
                  >
                    <option value="">-- Pilih Bulan --</option>
                    <option value="Januari">Januari</option>
                    <option value="Februari">Februari</option>
                    <option value="Maret">Maret</option>
                    <option value="April">April</option>
                    <option value="Mei">Mei</option>
                    <option value="Juni">Juni</option>
                    <option value="Juli">Juli</option>
                    <option value="Agustus">Agustus</option>
                    <option value="September">September</option>
                    <option value="Oktober">Oktober</option>
                    <option value="November">November</option>
                    <option value="Desember">Desember</option>
                  </select>
                </div>
              </div>
              <div className="field mt-4">
                <label className="label">Tahun</label>
                <div className="control">
                  <select
                    className="select is-fullwidth"
                    value={searchYear}
                    onChange={handleSearchYear}
                    required
                  >
                    <option value="">-- Pilih Tahun --</option>
                    {yearOptions}
                  </select>
                </div>
              </div>
              <div className="field mt-4">
                <label className="label">Nama Pegawai</label>
                <div className="control">
                  <select
                    className="select is-fullwidth"
                    value={searchName}
                    onChange={handleSearchName}
                  >
                    <option value="">-- Pilih Nama Pegawai --</option>
                    {nameOptions}
                  </select>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    Lihat Data
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlipGajiList;