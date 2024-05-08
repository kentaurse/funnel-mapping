import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Dropdown } from 'antd';
import { FaUser, FaUserFriends } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const LogoMenu = ({ children }) => {
  const navigate = useNavigate();
  const { userName, userEmail } = useSelector(state => state.user);

  const onLogOut = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  }
  
  const items = [
    { 
      key: '1', 
      label: (
        <div className='px-5'>
          <div className='flex flex-col justify-start'>
            <div>{userName}</div>
            <div className='text-[#6d6d6d]'>{userEmail}</div>
          </div>
        </div>
      ) 
    },
    { type: 'divider' },
    { 
      key: '2', 
      label: (
        <button className='flex gap-1 px-5'>
          <FaUser className='text-[20px] text-[#08c]'/>
          アカウント
        </button>
      ) 
    },
    { 
      key: '3', 
      label: (
        <button className='flex gap-1 px-5'>
          <FaUserFriends className='text-[25px] text-[#08c]'/>
          メンバー
        </button>
      ) 
    },
    { type: 'divider' },
    { 
      key: '4', 
      label: (
      <button className='flex gap-1 px-5' onClick={onLogOut}>
        <MdOutlineLogout className='text-[25px] text-[#08c]'/>
        LogOut
      </button>
      ) 
    }
  ];

  return (
    <Dropdown menu={{ items: items }} trigger={['click']} placement="bottomLeft" arrow>
      {children}
    </Dropdown>
  )
}

export default LogoMenu;