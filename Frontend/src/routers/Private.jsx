import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/UserSlice';

const Private = () => {
  const dispatch = useDispatch();
  const { tokenData } = useLoaderData();
  const isValid = tokenData.status === 200;
  if(isValid) dispatch(setUser(tokenData.data));
  
  return (
    isValid ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default Private;