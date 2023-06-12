import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../../features/authSlice'
import FormEditKehadiran from '../../../components/Form/DataKehadiran/FormEditKehadiran'

const EditKehadiran = () => {

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
        <FormEditKehadiran/>
    </Layout>
  )
}

export default EditKehadiran