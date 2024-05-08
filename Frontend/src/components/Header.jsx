import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from 'src/components/Theme';
import Navbar from 'src/components/Navbar';
import LogoMenu from 'src/components/menu/LogoMenu';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const Header = () => {
  const navigate = useNavigate();
  const { userName } = useSelector(state => state.user);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='header flex justify-between gap-5 px-10 items-center py-2'>
      <div className='flex flex-grow items-center'>
        <button onClick={() => navigate('/dashboard')}>
          <img src='/logo.png' className='h-[45px] pr-20'/>
        </button>
        <Navbar />
      </div>
      <div className='flex items-center gap-3'>
        <button shape="circle" className='flex justify-center items-center w-[40px] h-[40px] bg-base-100' onClick={toggleTheme}>
          {theme === 'light' ? <SunOutlined className='text-[30px] text-colorPrimary'/> : <MoonOutlined className='text-[30px] text-colorPrimary'/>}
        </button>
        <LogoMenu>
          <div className='flex items-center gap-2'>
            <img src='/user/man.png' className='w-[30px] rounded-full'/>
            <p>{userName}</p>
          </div>
        </LogoMenu>
      </div>
    </div>
  );
}

export default Header;
