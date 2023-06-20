import React, {useEffect} from 'react'
import Layout from '../../Layout/Layout'
import DetailDataPegawai from '../../../components/SideBar/DataPegawaiList/DetailDataPegawai/DetailDataPegawai';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../../features/authSlice'

const AddJabatan = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector(((state) => state.auth));

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
        <DetailDataPegawai/>
    </Layout>
  )
}

export default AddJabatan