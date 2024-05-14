import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/UserSlice';

const Public = () => {
  const dispatch = useDispatch();
  const { tokenData } = useLoaderData();
  let isValid = false;
  if(tokenData.status == 200) {
    dispatch(setUser(tokenData.data));
    isValid = true;
  }

  return (
    !isValid ? <Outlet/> : <Navigate to='/workspace'/>
  );
}

export default Public;
