import React from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from 'src/components/Header';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'
import 'src/assets/styles/App.css';

axiosSetting();

const App = () => {
  const { isHeaderBar } = useSelector(state => state.page);

  return (
    <div className="App flex flex-col h-screen overflow-hidden">
      {isHeaderBar ? <Header /> : '' }
      <Outlet />
    </div>
  );
}

export default App;
