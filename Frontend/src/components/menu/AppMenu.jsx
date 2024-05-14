import React from 'react';
import { Dropdown } from 'antd';

const items = [
  { 
    key: '1', 
    label: (
      <div className='px-5 select-none'>
        <div>アカウント:</div>
        <div className='pl-5'>Biztech</div>
      </div>
    ) 
  },
  { type: 'divider' },
  { 
    key: '2', 
    label: (
      <button className='flex gap-2 px-5'>
        <img src='fheader/1.png' className='w-6' />
        <h2>LSEED</h2>
      </button>
    ) 
  },
  { 
    key: '3', 
    label: (
      <button className='flex gap-2 px-5'>
        <img src='fheader/2.png' className='w-6' />
        <h2>ActiveCampaign</h2>
      </button>
    ) 
  }
];

const AppMenu = ({ children }) => {
  return (
    <Dropdown className='select-none' menu={{ items: items }} trigger={['click']} placement="bottomLeft" arrow>
      {children}
    </Dropdown>
  )
}

export default AppMenu;