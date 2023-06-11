import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../../features/authSlice';

import { IoPerson, IoHome, IoLogOut, IoMedalOutline } from 'react-icons/io5';

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
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/dashboard"}><IoHome/>Dashboard</NavLink></li>
                </ul>
                { user && user.hak_akses === "admin" && (
                    <div>
                        <p className="menu-label">
                        Master Data
                        </p>
                        <ul className="menu-list">
                        <li><NavLink to={"/data_pegawai"}><IoPerson/>Data Pegawai</NavLink></li>
                        <li><NavLink to={"/data_jabatan"}><IoMedalOutline/>Data Jabatan</NavLink></li>
                        </ul>
                    </div>
                )}
                <div>
                    <p className="menu-label">
                        Admin
                    </p>
                    <ul className="menu-list">
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