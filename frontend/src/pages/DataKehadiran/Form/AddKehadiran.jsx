import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import FormAddKehadiran from '../../../components/Form/DataKehadiran/FormAddKehadiran'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../../features/authSlice'

const AddKehadiran = () => {

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
        <FormAddKehadiran/>
    </Layout>
  )
}

export default AddKehadiran