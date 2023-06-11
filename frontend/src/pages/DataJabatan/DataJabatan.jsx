import React, {useEffect} from "react";
import Layout from "../Layout/Layout";
import DataJabatanList from "../../components/SideBar/DataJabatanList/DataJabatanList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const DataJabatan = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <DataJabatanList/>
        </Layout>
    )
}

export default DataJabatan