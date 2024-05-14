import React from 'react';
import { 
  Route, 
  redirect,
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
} from "react-router-dom";
import axios from 'axios';
import Public from 'src/routers/Public';
import Private from 'src/routers/Private';
import App from 'src/App';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import WorkspacePage from 'src/pages/WorkspacePage';
import AboutPage from 'src/pages/AboutPage';
import { ThemeProvider } from 'src/components/Theme';
import { tokenLogin } from 'src/components/TokenLogin';

axios.defaults.baseURL = env.REACT_APP_BASE_URL;

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<App />}>
          <Route element={<Private />} loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
          }}>
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Route>
        <Route element={<Public />} loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
        }}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" loader={() => redirect('/workspace')} />
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