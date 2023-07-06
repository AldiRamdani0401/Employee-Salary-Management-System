import React, { useState } from "react";
import axios from "axios";
import { IoPeopleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LaporanGajiList = () => {
  const navigate = useNavigate();
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [dataYear, setDataYear] = useState([]);

  const [foundData, setFoundData] = useState(null);
  const [dataNotFound, setDataNotFound] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const getLaporanGajiByYear = async (year, onDataFound) => {
    try {
      const tahun = await axios.get(
        `http://localhost:5000/laporan/gaji/year/${year}`
      );
      setDataYear(tahun.data);
      onDataFound();
      setFoundData(tahun.data); // Set the found data in the state
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 404) {
          setDataNotFound(true);
        } else {
          alert("Terjadi kesalahan saat memuat data.");
        }
      }
    }
  };

  const getLaporanGajiByMonth = async (month, onDataFound) => {
    try {
      const bulan = await axios.get(
        `http://localhost:5000/laporan/gaji/month/${month}`
      );
      onDataFound();
      setFoundData(bulan.data); // Set the found data in the state
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 404) {
          setDataNotFound(true);
        } else {
          alert("Terjadi kesalahan saat memuat data.");
        }
      }
    }
  };

  const handleSearchMonth = (event) => {
    setSearchMonth(event.target.value);
  };

  const handleSearchYear = (event) => {
    setSearchYear(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const selectedMonth = searchMonth;
    const selectedYear = searchYear;

    let yearDataFound = false;
    let monthDataFound = false;

    await Promise.all([
      getLaporanGajiByYear(selectedYear, () => (yearDataFound = true)),
      getLaporanGajiByMonth(selectedMonth, () => (monthDataFound = true)),
    ]);
    setShowMessage(true);

    if (yearDataFound && monthDataFound) {
      setShowMessage(false);
      navigate(
        `/laporan/gaji/print-page?month=${selectedMonth}&year=${selectedYear}`
      );
    } else {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  // Generate years for select options
  const yearOptions = [];
  for (let year = 2000; year <= 2100; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <section className="mt-2 mr-5 ml-5">
      <div className="container">
        <div className="header p-5 has-background-link is-flex is-justify-content-space-between">
          <h1 className="title p-3 has-text-white">
            <IoPeopleSharp size="30px" /> Laporan Gaji
          </h1>
        </div>
        <div className="card is-shadowless mt-2 p-3">
          <div className="p-1">
            <label className="label has-text-black">
              Filter Laporan Gaji Pegawai
            </label>
            <hr />
            <form onSubmit={handleSearch}>
              {showMessage && (
                <div class="notification is-danger">Data tidak ditemukan</div>
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
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    Cari
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

export default LaporanGajiList;
