import express from 'express';

/* === import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === import Controllers === */
import {
    // Data Pegawai
    getDataPegawai,
    getDataPegawaiByID,
    createDataPegawai,
    updateDataPegawai,
    deleteDataPegawai,
    getDataPegawaiByNik,
    getDataPegawaiByName,
    changePasswordAdmin
} from '../controllers/DataPegawai.js';

import {
    // Data Jabatan
    getDataJabatan,
    getDataJabatanByID,
    createDataJabatan,
    updateDataJabatan,
    deleteDataJabatan
} from "../controllers/DataJabatan.js";

import {
    // Data Kehadiran
    viewDataKehadiran,
    createDataKehadiran,
    updateDataKehadiran,
    deleteDataKehadiran,
    viewDataKehadiranByID,

    // Data Potongan
    createDataPotonganGaji,
    deleteDataPotongan,
    updateDataPotongan,
    viewDataPotongan,
    viewDataPotonganByID,

    // Data Gaji
    viewDataGajiPegawai,
    viewDataGajiById,
    viewDataGajiByName,
    viewDataGajiPegawaiByMonth,
    viewDataGajiPegawaiByYear
} from "../controllers/TransaksiController.js";

import {
    // Data Laporan Absensi
    viewLaporanAbsensiPegawaiByMonth,
    viewLaporanAbsensiPegawaiByYear,

    // Data Laporan Gaji
    viewLaporanGajiPegawai,
    viewLaporanGajiPegawaiByMonth,
    viewLaporanGajiPegawaiByName,
    viewLaporanGajiPegawaiByYear,

    // Slip Gaji
    viewSlipGajiByMonth,
    viewSlipGajiByName,
    viewSlipGajiByYear,
} from "../controllers/LaporanController.js";

import { LogOut, changePassword } from '../controllers/Auth.js';
import { dashboardPegawai, viewDataGajiSinglePegawaiByMonth, viewDataGajiSinglePegawaiByYear } from '../controllers/Pegawai.js';



const router = express.Router();


// Admin Route :

/* ==== Master Data ==== */
// Data Pegawai
router.get('/data-pegawai', verifyUser, adminOnly, getDataPegawai);
router.get('/data-pegawai/:id', verifyUser, adminOnly, getDataPegawaiByID);
router.get('/data-pegawai/nik/:nik', verifyUser, adminOnly, getDataPegawaiByNik);
router.get('/data-pegawai/name/:name', verifyUser, getDataPegawaiByName);
router.post('/data-pegawai', createDataPegawai);
router.patch('/data-pegawai/:id', verifyUser, adminOnly, updateDataPegawai);
router.delete('/data-pegawai/:id', verifyUser, adminOnly, deleteDataPegawai);
router.patch('/data-pegawai/:id/change-assword',  verifyUser, adminOnly, changePasswordAdmin);
// Data Jabatan
router.get('/data-jabatan', verifyUser, adminOnly, getDataJabatan);
router.get('/data-jabatan/:id', verifyUser, adminOnly, getDataJabatanByID);
router.post('/data-jabatan', verifyUser, adminOnly, createDataJabatan);
router.patch('/data-jabatan/:id', verifyUser,  adminOnly, updateDataJabatan);
router.delete('/data-jabatan/:id', verifyUser, adminOnly, deleteDataJabatan);

/* ==== Transaksi  ==== */
// Data Kehadiran
router.get('/data-kehadiran', verifyUser, adminOnly, viewDataKehadiran);
router.get('/data-kehadiran/:id', verifyUser, adminOnly, viewDataKehadiranByID);
router.post('/data-kehadiran', createDataKehadiran);
router.patch('/data-kehadiran/:id', updateDataKehadiran);
router.delete('/data-kehadiran/:id', verifyUser, adminOnly, deleteDataKehadiran);
// Data Potongan
router.get('/data-potongan', adminOnly, verifyUser, viewDataPotongan);
router.get('/data-potongan/:id', adminOnly, verifyUser, viewDataPotonganByID);
router.post('/data-potongan', adminOnly, verifyUser, createDataPotonganGaji);
router.patch('/data-potongan/update/:id', adminOnly, verifyUser, updateDataPotongan);
router.delete('/data-potongan/:id', adminOnly, verifyUser, deleteDataPotongan);
// Data Gaji
router.get('/data-gaji', viewDataGajiPegawai);
router.get('/data-gaji/:id', viewDataGajiById);
router.get('/data-gaji/name/:name', viewDataGajiByName);
router.get('/data-gaji/month/:month', viewDataGajiPegawaiByMonth);
router.get('/data-gaji/year/:year', viewDataGajiPegawaiByYear);

/* ====  Laporan  ==== */
// laporan Gaji Pegawai
router.get('/laporan/gaji', viewLaporanGajiPegawai);
router.get('/laporan/gaji/name/:name', viewLaporanGajiPegawaiByName);
router.get('/laporan/gaji/month/:month', viewLaporanGajiPegawaiByMonth);
router.get('/laporan/gaji/year/:year', viewLaporanGajiPegawaiByYear);
// Laporan Absensi Pegawai
router.get('/laporan/absensi/month/:month', viewLaporanAbsensiPegawaiByMonth);
router.get('/laporan/absensi/year/:year', viewLaporanAbsensiPegawaiByYear);
// Slip Gaji Pegawai
router.get('/laporan/slip-gaji/name/:name', viewSlipGajiByName);
router.get('/laporan/slip-gaji/month/:month', viewSlipGajiByMonth);
router.get('/laporan/slip-gaji/year/:year', viewSlipGajiByYear);

/* ==== Ubah Password ==== */
router.patch('/change-password', verifyUser, changePassword);

/* ==== Logout ==== */
router.delete('/logout', LogOut);



// Pegawai Route :
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, dashboardPegawai);
/* ==== Data Gaji ==== */
router.get('/data-gaji/month/:month', verifyUser, viewDataGajiSinglePegawaiByMonth);
router.get('/data-gaji/year/:year', verifyUser, viewDataGajiSinglePegawaiByYear);
/* ==== Ubah Password ==== */
router.patch('/change-password', verifyUser, changePassword);
/* ==== Logout ==== */
router.delete('/logout', LogOut);


export default router;