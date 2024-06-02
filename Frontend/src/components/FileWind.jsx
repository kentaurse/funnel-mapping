import React, { useEffect, useState } from 'react';
import { Menu, Radio } from 'antd';
import { LiaFolderPlusSolid, LiaFolderSolid, LiaFileMedicalSolid, LiaFile } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { onFileWndLoading, addOpenFiles, setTempFile, setSelectFile, setSelectFolder, setRename } from 'src/redux/slices/PageSlice';
import NewDialog from "src/components/dialog/NewDialog";

const FileWind = () => {
  const [itemList, setItemList] = useState({});
  const [workFileList, setWorkFileList] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { openFiles, selectFile, selectFolder, isFileWndLoading } = useSelector(state => state.page);

  const getItem = (label, key, type, flag, children) => {
    return {
      key: key,
      children: children,
      label: (
        <div className='flex items-center select-none' id={key} onContextMenu={(e) => flag ? onEditName(e, key) : ''} onDoubleClick={() => !type ? onFileOpen(key, label) : ''}>
          {type && flag && <Radio value={key} />}
          {type ? <LiaFolderSolid className='text-[35px] text-[#08c] pr-2' /> : <LiaFile className='text-[35px] text-[#08c] pr-2' />}
          <p>{label}</p>
        </div>
      )
    };
  }
  
  const makeItemList = (datas, flag = false) => {
    const res = [];
    const folders = datas.filter(data => data.isDirectory == true);
    folders.map(folder => {
      const childrens = [];
      const files = datas.filter(file => file.parentId === folder._id);
      files.map(file => {
        childrens.push(getItem(file.name, file._id, file.isDirectory, flag));
      })
      res.push(getItem(folder.name, folder._id, folder.isDirectory, flag, childrens));
    })
    return res;
  }

  const getItems = async () => {
    const items = (await axios.get('/file')).data;
    const workData = items.filter(item => item.classify == 'work');
    setWorkFileList(workData.filter(item => item.isDirectory == false));
    const workList = makeItemList(workData, true);
    const lseedData = items.filter(item => item.classify == 'lseed');
    const lseedList = makeItemList(lseedData);
    const activeData = items.filter(item => item.classify == 'active');
    const activeList = makeItemList(activeData);
    const otherData = items.filter(item => item.classify == 'other');
    const otherList = makeItemList(otherData);
    setItemList({work: workList, lseed: lseedList, active: activeList, other: otherList});
  }
  
  const setItems = async (flag) => {
    if(flag){
      await axios.post('/file', {name: 'New', classify: 'work', parentId: 'parent', isDirectory: flag});
    }else {
      await axios.post('/file', {name: 'New File', classify: 'work', parentId: selectFolder, isDirectory: flag});
    }
    getItems();
  }

  const onSelectFolder = (e) => {
    dispatch(setSelectFolder(e.target.value));
  }
  
  const onSelectItem = (e) => {
    const key = e.key;
    const isExist = openFiles.filter(file => file.key === key).length > 0 ? true : false;
    const name = workFileList.filter(item => item._id === e.key)[0].name;
    dispatch(setSelectFile(key));
    if(!isExist) dispatch(setTempFile({key, name}));
  }

  const onFileOpen = (key, name) => {
    dispatch(addOpenFiles({key, name}));
    dispatch(setTempFile(null));
  }
  
  const onEditName = (e, key) => {
    e.preventDefault();
    const element = document.getElementById(key);
    const textContent = element.querySelector('p').textContent;
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('class', 'tempInput');
    inputElement.addEventListener('blur', (e) => {
      onSaveFileName(e, key)
    });
    inputElement.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        e.target.blur();
      }
    });
    inputElement.setAttribute('value', textContent);
    element.replaceChild(inputElement, element.querySelector('p'));
    inputElement.selectionStart = 0;
    inputElement.selectionEnd = inputElement.value.length;
    inputElement.focus();
  };

  const onSaveFileName = async (e, key) => {
    const data = {_id: key, name: e.target.value};
    const element = document.getElementById(key);
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = e.target.value;
    element.replaceChild(paragraphElement, e.target);
    dispatch(setRename(data));
    const res = await axios.put('/file', data);
    if(res.status == 200) {
      getItems();
    }
  }
  
  const handleOk = (e) => {
    setModal(false);
    getItems();
  }
  
  const handleCancel = () => {
    setModal(false);
  }
  
  const openModal = () => {
    if(selectFolder !== null) {
      setModal(true)
    }else {
      Notification('Please select folder!', 'warn');
    }
  }

  useEffect(() => {
    if(isFileWndLoading) {
      dispatch(onFileWndLoading());
      getItems();
    }
  }, [isFileWndLoading])
  
  useEffect(() => {
    getItems();
  }, [])

  return (
    <div className='flex flex-col w-[300px] h-full shadow'>
      <div className='pb-5'>
        <div className='flex justify-center items-center select-none gap-2 bg-[#08c] py-5'>
          <h2>MYプロジェクト</h2>
          <div className='flex gap-1'>
            <button onClick={() => setItems(true)}><LiaFolderPlusSolid className='text-[40px] text-[#cca700]' /></button>
            <button onClick={() => openModal()}><LiaFileMedicalSolid className='text-[40px] text-[#cca700]' /></button>
          </div>
        </div>
        <Radio.Group onChange={onSelectFolder} className='w-full'>
          <Menu selectedKeys={selectFile} onSelect={onSelectItem} items={itemList.work} mode="inline" className='bg-base-300' />
        </Radio.Group>
      </div>
      <div>
        <div className='select-none pb-5'>
          <div className='flex items-end gap-2 px-8 bg-[#08c] py-2'>
            <img src='FileWnd/LSEED.png' className='w-7' />
            <h2>LSEED</h2>
          </div>
          <Menu items={itemList.lseed} mode="inline" className='bg-base-300' />
        </div>
        <div className='select-none pb-5'>
          <div className='flex items-end gap-2 px-8 bg-[#08c] py-2'>
            <img src='FileWnd/ActiveCampaign.png' className='w-7' />
            <h2>ActiveCampaign</h2>
          </div>
          <Menu items={itemList.active} mode="inline" className='bg-base-300' />
        </div>
        <div>
          <div className='flex items-end select-none gap-2 px-8 bg-[#08c] py-2'>
          <img src='FileWnd/Other.png' className='w-7' />
            <h2>その他オブジェクト</h2>
          </div>
          <Menu items={itemList.other} mode="inline" className='bg-base-300' />
        </div>
      </div>
      <NewDialog open={modal} onOk={() => handleOk('new')} onCancel={handleCancel} />
    </div>
  );
}

export default FileWind;
