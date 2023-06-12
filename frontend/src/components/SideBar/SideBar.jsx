import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../../features/authSlice';

import { IoPerson, IoHome, IoLogOut, IoMedalOutline, IoCalendarClearSharp, IoCut, IoCashOutline } from 'react-icons/io5';

const SideBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    };

    return (
        <div>
            <aside className="menu pl-2 pt-5 is-white">
                <p className="menu-label p-2 has-text-white has-background-link has-text-weight-bold">
                    General
                </p>
                <ul className="menu-list m-3">
                    <li><NavLink to={"/dashboard"}><IoHome/> Dashboard</NavLink></li>
                </ul>
                { user && user.hak_akses === "admin" && (
                    <div>
                        <p className="menu-label p-2 has-text-white has-background-link has-text-weight-bold">
                        Master Data
                        </p>
                        <ul className="menu-list m-3">
                        <li><NavLink to={"/data_pegawai"}><IoPerson/> Data Pegawai</NavLink></li>
                        <li><NavLink to={"/data_jabatan"}><IoMedalOutline/> Data Jabatan</NavLink></li>
                        </ul>
                    </div>
                )}
                { user && user.hak_akses === "admin" && (
                    <div>
                        <p className="menu-label p-2 has-text-white has-background-link has-text-weight-bold">
                        Transaksi
                        </p>
                        <ul className="menu-list m-3">
                        <li><NavLink to={"/data_kehadiran"}><IoCalendarClearSharp/> Data Kehadiran</NavLink></li>
                        <li><NavLink to={"/data_potongan"}><IoCut/> Data Potongan</NavLink></li>
                        <li><NavLink to={"/data_jabatan"}><IoCashOutline/> Data Gaji</NavLink></li>
                        </ul>
                    </div>
                )}
                { user && user.hak_akses === "admin" && (
                    <div>
                        <p className="menu-label p-2 has-text-white has-background-link has-text-weight-bold">
                        Laporan
                        </p>
                        <ul className="menu-list m-3">
                        <li><NavLink to={"/data_pegawai"}><IoPerson/>Laporan Gaji</NavLink></li>
                        <li><NavLink to={"/data_jabatan"}><IoMedalOutline/>Laporan Absensi</NavLink></li>
                        <li><NavLink to={"/data_jabatan"}><IoMedalOutline/>Slip Gaji</NavLink></li>
                        </ul>
                    </div>
                )}
                <div>
                    <p className="menu-label">
                        Admin
                    </p>
                    <ul className="menu-list m-3">
                        <li><NavLink to={"/users"}><IoPerson/>users</NavLink></li>
                    </ul>
                </div>
                <p className="menu-label">
                    Settings
                </p>
                <ul className="menu-list">
                    <li><button onClick={logout} className='button is-white'><IoLogOut/>Logout</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default SideBar