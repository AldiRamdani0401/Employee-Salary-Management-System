import React, {useEffect} from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import LaporanGajiList from "../../../components/SideBar/Laporan/LaporanGaji/LaporanGajiList";

const LaporanGaji = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
        if(user && user.hak_akses !== 'admin'){
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <LaporanGajiList/>
        </Layout>
    )
}

export default LaporanGaji