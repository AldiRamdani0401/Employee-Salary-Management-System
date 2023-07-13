import React, {useEffect} from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import SlipGaji from "../../../components/SideBar/Laporan/SlipGaji/SlipGajiList.jsx";

const SlipGajiPage = () => {

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
            <SlipGaji/>
        </Layout>
    )
}

export default SlipGajiPage