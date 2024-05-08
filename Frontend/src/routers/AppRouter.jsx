import React from 'react';
import { 
  Route,
  redirect,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from 'axios';
import { ThemeProvider } from 'src/components/Theme';
import { tokenLogin } from 'src/components/TokenLogin';
import App from 'src/App';
import Public from 'src/routers/Public';
import Private from 'src/routers/Private';
import Error from 'src/components/Error';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import AboutPage from 'src/pages/AboutPage';
import Dashboard from 'src/pages/Dashboard';
import Blog from 'src/pages/Blog';

axios.defaults.baseURL = process.env.REACT_API_BASE_URL;

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<App />}>
          <Route element={<Private />} errorElement={<Error />} loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
          }}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
          </Route>
        </Route>
        <Route element={<Public />} loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
        }}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" loader={() => redirect('/dashboard')} />
      </>
    )
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default AppRouter;