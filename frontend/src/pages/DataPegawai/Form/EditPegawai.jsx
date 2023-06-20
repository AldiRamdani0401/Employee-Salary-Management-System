import React, {useEffect} from 'react'
import Layout from '../../Layout/Layout'
import FormEditPegawai from '../../../components/SideBar/DataPegawaiList/Form/DataPegawai/FormEditPegawai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../../features/authSlice'


const EditPegawai = () => {

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
        <FormEditPegawai/>
    </Layout>
  )
}

export default EditPegawai