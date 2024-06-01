import React, { useEffect, useContext } from 'react';
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { AppstoreOutlined, SunOutlined, MoonOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { onFileWind } from 'src/redux/slices/PageSlice';
import { ThemeContext } from 'src/components/Theme';
import AppMenu from 'src/components/menu/AppMenu';
import LogoMenu from 'src/components/menu/LogoMenu';

const Header = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.user);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const onMenu = () => {
    dispatch(onFileWind());
  }

  return (
    <div className='flex justify-between gap-5 px-10 items-center py-2 shadow'>
      <div className='flex items-center'>
        <button className='pr-5' onClick={onMenu}>
          <MenuOutlined className='text-[30px] text-[#08c]'/>
        </button>
        <button onClick={() => navigate('/workspace')}>
          <img src='/logo.png' className='h-[45px] pr-20'/>
        </button>
        <Input className='w-[320px] h-[35px] rounded-full' suffix={<SearchOutlined className="site-form-item-icon" />}/>
      </div>
      <div className='flex items-center gap-3'>
        <AppMenu>
          <button shape="circle" className='flex justify-center items-center w-[40px] h-[40px] bg-base-300'>
            <AppstoreOutlined className='text-[30px] text-[#08c]'/>
          </button>
        </AppMenu>
        <button shape="circle" className='flex justify-center items-center w-[40px] h-[40px] bg-base-300' onClick={toggleTheme}>
          {theme === 'light' ? <SunOutlined className='text-[30px] text-[#08c]'/> : <MoonOutlined className='text-[30px] text-[#08c]'/>}
        </button>
        <LogoMenu>
          <div className='flex items-center gap-2'>
            <img src='User/user.png' className='w-[40px] rounded-full'/>
            <p>{userName}</p>
          </div>
        </LogoMenu>
      </div>
    </div>
  );
}

export default Header;
