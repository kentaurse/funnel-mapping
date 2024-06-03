import React, { useState } from 'react';
import { FaPlusCircle, FaCog, FaTags, FaTable, FaCloudDownloadAlt, FaRecycle } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { HiMiniArrowsPointingIn, HiMiniArrowsPointingOut } from "react-icons/hi2";
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";
import { LuMousePointerClick, LuLink2, LuShare2, LuTrash2 } from "react-icons/lu";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NewDialog from "src/components/dialog/NewDialog";
import SettingDialog from "src/components/dialog/SettingDialog";
import ShareDialog from "src/components/dialog/ShareDialog";
import JointDialog from "src/components/dialog/JointDialog";
import { setViewMode, addOpenFiles, removeOpenFiles, setTempFile, setSelectFile, onFileWndLoading, setRedo, setUndo, setInitialCanvas } from 'src/redux/slices/PageSlice';
import { setDelete } from 'src/redux/slices/NodeSlice';
import DownloadMenu from 'src/components/menu/DownloadMenu';

const MenuWind = () => {
  const [color, setColor] = useState();
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const { openFiles, tempFile, selectFile, selectFolder } = useSelector(state => state.page);
  const [modal, setModal] = useState({
    new: false, share: false, setting: false, joint: false
  });

  const addFile = async () => {
    if (selectFolder !== null) {
      if (openFiles.length < 3) {
        setModal(pre => ({...pre, new: true}));
      }
    } else {
      Notification('Please select folder!', 'warn');
    }
  }

  const onFullScreen = () => {
    const elem = document.documentElement;
    if (!fullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      dispatch(setViewMode(false));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      dispatch(setViewMode(true));
    }
    setFullScreen(!fullScreen);
  };

  const handleOk = async (e) => {
    if (e === 'new') {
      setModal(pre => ({ ...pre, new: false }))
    }
    if (e === 'share') {
      setModal(pre => ({ ...pre, share: false }))
    }
    if (e === 'setting') {
      setModal(pre => ({ ...pre, setting: false }))
    }
    if (e === 'joint') {
      setModal(pre => ({ ...pre, joint: false }))
    }
  }

  const handleCancel = () => {
    setModal({ new: false, share: false, setting: false, joint: false });
  }

  return (
    <div className='flex justify-between shadow px-5 bg-base-200 overflow-hidden'>
      <div className='flex no-scrollbar overflow-x-auto'>

        {openFiles && openFiles.map((file, index) => (
          <div key={index} className='flex h-full items-end pr-1' onClick={() => dispatch(setSelectFile(file.key))}>
            <div className={'flex justify-center items-center gap-1 h-11 px-2 rounded-t-md border dark:bg-[#4c52689c] ' + (selectFile === file?.key ? 'border-[#08c] border-b-0' : 'border-base-100')}>
              <p className='max-w-36 long-text select-none'>{file.name}</p>
              <button onClick={(e) => { e.stopPropagation(); dispatch(removeOpenFiles(file.key)); }}><RiCloseFill className='text-[20px] hover:text-[#08c]' /></button>
            </div>
          </div>
        ))
        }

        {tempFile &&
          <div className='flex h-full items-end pr-1' onClick={() => dispatch(setSelectFile(tempFile?.key))}>
            <div className={'flex justify-center items-center gap-1 h-11 px-2 rounded-t-md border dark:bg-[#4c52689c] ' + (selectFile === tempFile?.key ? 'border-[#08c] border-b-0' : 'border-base-100')}>
              <p className='max-w-36 long-text select-none italic'>{tempFile.name}</p>
              <button onClick={(e) => { e.stopPropagation(); dispatch(setTempFile(null)); }}><RiCloseFill className='text-[20px] hover:text-[#08c]' /></button>
            </div>
          </div>
        }

        <button onClick={addFile}><FaPlusCircle className='text-[30px] text-[#08c]' /></button>
      </div>
      <div className='flex gap-5 py-2'>
        <button onClick={() => setModal(pre => ({ ...pre, new: true }))}><LuMousePointerClick className='text-[30px] text-[#08c]' /></button>
        <button onClick={() => setModal(pre => ({ ...pre, setting: true }))}><FaCog className='text-[30px] text-[#08c]' /></button>
        <button><FaTags className='text-[30px] text-[#08c]' /></button>
        <button><FaTable className='text-[30px] text-[#08c]' /></button>
        <DownloadMenu><FaCloudDownloadAlt className='text-[30px] text-[#08c]' /></DownloadMenu>
        <button onClick={() => setModal(pre => ({ ...pre, joint: true }))}><LuLink2 className='text-[30px] text-[#08c]' /></button>
        <button onClick={onFullScreen}>
          {fullScreen ? <HiMiniArrowsPointingIn className='text-[30px] text-[#08c]' /> : <HiMiniArrowsPointingOut className='text-[30px] text-[#08c]' />}
        </button>
        <button onClick={() => setModal(pre => ({ ...pre, share: true }))}><LuShare2 className='text-[30px] text-[#08c]' /></button>
        <button onClick={() => dispatch(setUndo(true))}><TiArrowBackOutline className='text-[30px] text-[#08c]' /></button>
        <button onClick={() => dispatch(setRedo(true))}><TiArrowForwardOutline className='text-[30px] text-[#08c]' /></button>
        <button onClick={() => dispatch(setInitialCanvas(true))}><FaRecycle className='text-[30px] text-[#08c]' /></button>
        <button onClick={() => dispatch(setDelete(true))}><LuTrash2 className='text-[30px] text-[#08c]' /></button>
      </div>

      <NewDialog open={modal.new} flag={true} onOk={() => handleOk('new')} onCancel={handleCancel} />
      <ShareDialog open={modal.share} onOk={() => handleOk('share')} onCancel={handleCancel} />
      <SettingDialog open={modal.setting} onOk={() => handleOk('setting')} onCancel={handleCancel} />
      <JointDialog open={modal.joint} onOk={() => handleOk('joint')} onCancel={handleCancel} />

    </div>
  );
}

export default MenuWind;
