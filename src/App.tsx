import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import { initialAuth } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAuth());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
