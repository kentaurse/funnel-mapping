import React from 'react';
import { Dropdown } from 'antd';
import { setDownloadCanvas, setDownloadContent } from "src/redux/slices/PageSlice";
import { useDispatch } from 'react-redux';

const AppMenu = ({ children }) => {
  const dispatch = useDispatch();
  const items = [
    { 
      key: '1', 
      label: (
        <button onClick={() => dispatch(setDownloadCanvas(true))}>キャンバスエクスポート</button>
      ) 
    },
    { 
      key: '2', 
      label: (
        <button onClick={() => dispatch(setDownloadContent(true))}>コンテンツデータエクスポート</button>
      ) 
    },
  ];
  return (
    <Dropdown className='select-none' menu={{ items: items }} trigger={['click']} placement="bottomLeft" arrow>
      {children}
    </Dropdown>
  )
}

export default AppMenu;