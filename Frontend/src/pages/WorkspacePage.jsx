import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import FileWind from 'src/components/FileWind'
import ObjectWind from 'src/components/ObjectWind'
import MenuWind from 'src/components/MenuWind'
import 'src/assets/styles/App.css'
import CanvasWind from "src/components/CanvasWind";
import NodeSettingDialog from "src/components/dialog/NodeSettingDialog";
import { onObjectWnd } from '../redux/slices/PageSlice';

const WorkspacePage = () => {
  const { isFileWnd, isObjectWnd, isNodeSettingDlg } = useSelector(state => state.page);
  const dispatch = useDispatch();
  return (
    <div className='flex overflow-hidden h-full'>
      <div className='no-scrollbar overflow-y-auto'>
        {isFileWnd && <FileWind />}
      </div>
      <div className='bg-base-200'>
        {isObjectWnd && <ObjectWind />}
      </div>
      <div className='relative bg-base-100 w-3 flex items-center'>
        <button onClick={() => dispatch(onObjectWnd())} className='w-3 h-10 bg-[#08c]'>
          {isObjectWnd ? <CaretLeftOutlined /> : <CaretRightOutlined />}
        </button>
      </div>
      <div className='flex-1 relative'>
        <MenuWind />
        <CanvasWind />
        {isNodeSettingDlg && <NodeSettingDialog />}
      </div>
    </div>
  )
}

export default WorkspacePage
