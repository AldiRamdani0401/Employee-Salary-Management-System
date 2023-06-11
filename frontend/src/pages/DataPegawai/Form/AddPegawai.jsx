import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import FormAddPegawai from '../../../components/Form/DataPegawai/FormAddPegawai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../../features/authSlice'

const AddPegawai = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector(((state) => state.auth));

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/");
    }
    if(user && user.hak_akses !== "admin"){
        navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <FormAddPegawai/>
    </Layout>
  )
}

export default AddPegawai