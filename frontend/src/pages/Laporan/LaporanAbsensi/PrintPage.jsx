import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const PrintPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.hak_akses !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const [kota, setKota] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleKotaChange = (e) => {
    setKota(e.target.value);
  };

  const handleTanggalChange = (e) => {
    setTanggal(e.target.value);
  };

  const [dataYear, setDataYear] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);

  const getDataByYear = async (selectedYear) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/laporan/absensi/year/${selectedYear}`
      );
      setDataYear(response.data);
      console.log("data dari tahun: ", response);
    } catch (error) {
      if (error.response && error.response.data) {
        alert("Terjadi kesalahan saat memuat data.");
      }
    }
  };

  const getDataByMonth = async (selectedMonth) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/laporan/absensi/month/${selectedMonth}`
      );
      setDataMonth(response.data);
      console.log("data dari bulan: ", response);
    } catch (error) {
      if (error.response && error.response.data) {
        alert("Terjadi kesalahan saat memuat data.");
      }
    }
  };

  useEffect(() => {
    getDataByYear(year);
    getDataByMonth(month);
  }, [year, month]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // Hide the print button when printing
    const style = document.createElement("style");
    style.innerHTML =
      "@media print { button#print-button { display: none; } #kembali { display: none; } .columns form.box{display: none}}";
    document.head.appendChild(style);

    // Set margin size to a minimum when printing
    const printStyle = document.createElement("style");
    printStyle.innerHTML = `@media print {
      @page {
        size: A4;
        margin: 2cm;
        zoom: 0.8;
      }
      table{
        margin-left: 21%;
      }
      p#periode{
        margin-left: 15%;
      }
      h1 {
        text-align: center;
        font-size: 15px;
      }
      p {
        font-size: 10px;
      }
      th {
        font-size: 8px;
        text-align: center;
      }
      td {
        font-size: 8px;
      }
      .tandaTangan{
        margin-left: 280px;
      }
      .tandaTangan p#tanggal{
        font-size: 10px;
      }
      .tandaTangan .bagian p#bagian{
        margin-left: 110px;
      }
    }`;
    document.head.appendChild(printStyle);

    // Remove title and URL when printing
    const handleBeforePrint = () => {
      document.title = "";
      window.history.replaceState(null, "", window.location.href);
    };

    const handleAfterPrint = () => {
      document.title = "Print Page";
      window.history.replaceState(null, "", window.location.href);
    };

    window.onbeforeprint = handleBeforePrint;
    window.onafterprint = handleAfterPrint;

    return () => {
      // Remove the style tags and event listeners when the component is unmounted
      document.head.removeChild(style);
      document.head.removeChild(printStyle);
      window.onbeforeprint = null;
      window.onafterprint = null;
    };
  }, []);

  // Render the data on the print page
  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <h1 className="has-text-weight-bold">
            LAPORAN ABSENSI PEGAWAI PT . MULIA SEJATI NUSANTARA
          </h1>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <p id="periode" className="has-text-weight-bold mt-5 mb-2">
            Periode : {month} {year}
          </p>
          <table className="table is-bordered is-striped is-narrow has-text-centered p-3">
            <thead>
              <tr>
                <th>No</th>
                <th>NIK</th>
                <th>Nama Pegawai</th>
                <th>Jabatan Pegawai</th>
                <th>Hadir(Hari)</th>
                <th>Sakit(Hari)</th>
                <th>Alpha(Hari)</th>
              </tr>
            </thead>
            <tbody>
              {dataYear.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.nik}</td>
                  <td>{data.nama_pegawai}</td>
                  <td>{data.jabatan_pegawai}</td>
                  <td>{data.hadir}</td>
                  <td>{data.sakit}</td>
                  <td>{data.alpha}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="tandaTangan">
            <div className="columns">
              <div className="column" style={{ marginRight: "63%" }}>
                <p id="tanggal" className="has-text-weight-bold has-text-right">
                  {kota}, {tanggal} {month} {year}
                </p>
                <div className="bagian">
                  <p
                    className="has-text-weight-bold has-text-right mr-6"
                    id="bagian"
                  >
                    Finance
                  </p>
                </div>
                <br />
                <br />
                <p className="has-text-weight-bold has-text-right">
                  _________________________
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <button
            id="print-button"
            type="submit"
            className="button is-link"
            onClick={handlePrint}
          >
            Print
          </button>
          <Link
            id="kembali"
            to={"/laporan/absensi"}
            type="button"
            className="button is-danger ml-3"
          >
            Kembali
          </Link>
        </div>
      </div>
      <div className="columns">
        <form className="box">
          <div className="field">
            <label className="label">Setting Kota & Tanggal</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                value={kota}
                onChange={handleKotaChange}
                placeholder="Masukkan nama kota"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                value={tanggal}
                onChange={handleTanggalChange}
                placeholder="Masukkan tanggal"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PrintPage;
