import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Divider, Menu } from 'antd';
import { FaPlusCircle, FaListAlt, FaEdit, FaTable, FaCloudDownloadAlt, FaRecycle } from "react-icons/fa";
import { LuMousePointerClick, LuLink2, LuShare2, LuTrash2 } from "react-icons/lu";
import { BiSolidChevronsLeft, BiSolidChevronsRight } from "react-icons/bi";
import { SearchOutlined, UndoOutlined, FilterOutlined } from '@ant-design/icons';
import { VscTag } from "react-icons/vsc";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCategory } from "src/redux/slices/NodeSlice";
const { SubMenu } = Menu;

const JointDialog = ({ open, onOk, onCancel }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState({});
  const [allMenuData, setAllMenuData] = useState();
  const [children, setChildren] = useState({});
  const [menuData, setMenuData] = useState({
    plus: [],
    minus: [],
  });

  const getItem = (label, key, type, flag, children) => {
    return {
      key: key,
      children: children,
      label: (
        <div className='flex items-center select-none' id={key}>
          {type && flag && <Radio value={key} />}
          {type ? <LiaFolderSolid className='text-[35px] text-[#08c] pr-2' /> : <LiaFile className='text-[35px] text-[#08c] pr-2' />}
          <p>{label}</p>
        </div>
      )
    };
  }
  const addFile = () => {

  }
  
  const onOkClick = () => {
    dispatch(setCategory(menuData));
    onOk();
  }

  const onSelect = (e) => {
    const temp = allMenuData.filter(item => item._id === e.path[0])
    setSelect(pre => ({...pre, [e.name]: { name: temp[0].name, type: e.path[1], _id: e.path[0] } }));
  }

  const getCategoryList = async () => {
    try {
      // const categories = { name: 'Technology', type: 'Blog', icon: 'tech-icon.png' };
      // const response = await axios.post('/category', categories);
      const response = await axios.get('/category');
      const allData = response.data;

      // Filter out parent categories
      const tag = allData.filter(item => item.type === 'tag');
      const list = allData.filter(item => item.type === 'list');
      const field = allData.filter(item => item.type === 'field');
      const category = allData.filter(item => item.type === 'category');
      const data = { tag, list, field, category };
      setChildren(data);
      setAllMenuData(allData);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, [])
  const onSetMenu = (type, method) => {
    if (type == true && method == true) {
      const temp = menuData['plus']
      console.log(menuData);
      temp.push(select['main'])
      setMenuData(pre => ({ ...pre, plus: temp }))
    }
    if (type == true && method == false) {
      const temp = menuData['plus']
      const res = temp.filter(item => item._id !== select['plus']._id);
      setMenuData(pre => ({ ...pre, plus: res }))
    }
    if (type == false && method == true) {
      const temp = menuData['minus']
      console.log(menuData);
      temp.push(select['main'])
      setMenuData(pre => ({ ...pre, minus: temp }))
    }
    if (type == false && method == false) {
      const temp = menuData['minus']
      const res = temp.filter(item => item._id !== select['minus']._id);
      setMenuData(pre => ({ ...pre, minus: res }))
    }
  }
  return (
    <Modal className='select-none' centered open={open} onOk={onOk} onCancel={onCancel} footer={false} width={700}>
      <h3 className='text-center pt-5'>ジョイント右２ アクション設定</h3>
      <Divider />
      <div className='flex flex-col gap-5'>
        <div className='flex gap-10'>
          <div className='w-[300px] border border-base-500'>
            <div className='flex justify-end gap-2 border-t-4 border-blue-500 px-5 py-2'>
              <button><UndoOutlined className='text-[25px]' /></button>
              <button><FilterOutlined className='text-[25px]' /></button>
              <button><SearchOutlined className='text-[25px]' /></button>
            </div>
            <div className='h-[400px] overflow-y-auto no-scrollbar border-t'>
              <Menu mode='inline' className='select-none' onSelect={(e) => onSelect({ path: e.keyPath, name: 'main' })}>
                <SubMenu key={'tag'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <VscTag className='text-[25px] text-[#08c]' />
                      <p>タグ</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]' /></button>
                  </div>
                }>
                  {
                    children['tag']?.map((item, index) => (
                      <Menu.Item key={item._id}>
                        <div className='flex justify-between pr-2'>
                          <div className='flex items-center gap-2'>
                            <LuLink2 className='text-[25px] text-[#08c]' />
                            <p>{item?.name}</p>
                          </div>
                        </div>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>

                <SubMenu key={'list'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <FaListAlt className='text-[25px] text-[#08c]' />
                      <p>リスト</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]' /></button>
                  </div>
                }>
                  {
                    children['list']?.map((item, index) => (
                      <Menu.Item key={item._id}>
                        <div className='flex justify-between pr-2'>
                          <div className='flex items-center gap-2'>
                            <LuLink2 className='text-[25px] text-[#08c]' />
                            <p>{item?.name}</p>
                          </div>
                        </div>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>
                <SubMenu key={'field'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <FaEdit className='text-[25px] text-[#08c]' />
                      <p>フィールド</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]' /></button>
                  </div>
                }>
                  {
                    children['field']?.map((item, index) => (
                      <Menu.Item key={item._id}>
                        <div className='flex justify-between pr-2'>
                          <div className='flex items-center gap-2'>
                            <LuLink2 className='text-[25px] text-[#08c]' />
                            <p>{item?.name}</p>
                          </div>
                        </div>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>
              </Menu>
            </div>
          </div>

          <div className='w-[340px]'>
            <p className='pl-[80px] pt-4'>追加アクション</p>
            <div className='flex items-center gap-5'>
              <div className='flex flex-col gap-2'>
                <Button onClick={() => onSetMenu(true, true)}><BiSolidChevronsRight className='text-[25px] text-[#08c]' /></Button>
                <Button onClick={() => onSetMenu(true, false)}><BiSolidChevronsLeft className='text-[25px] text-[#08c]' /></Button>
              </div>
              <Menu mode='inline' className='select-none w-full h-40 border border-base-500 overflow-y-auto' onSelect={(e) => onSelect({ path: e.keyPath, name: 'plus' })}>
                {
                  menuData['plus'].map((item, key) => (
                    <Menu.Item key={item._id}>
                      <div className='flex justify-between pr-2'>
                        <div className='flex items-center gap-2'>
                          <LuLink2 className='text-[25px] text-[#08c]' />
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </Menu.Item>
                  ))
                }
              </Menu>
              {/* <div className='w-full h-40 border border-base-500'>

              </div> */}
            </div>
            <p className='pl-[80px] pt-10'>削減アクション</p>
            <div className='flex items-center gap-5'>
              <div className='flex flex-col gap-2'>
                <Button onClick={() => onSetMenu(false, true)}><BiSolidChevronsRight className='text-[25px] text-[#08c]' /></Button>
                <Button onClick={() => onSetMenu(false, false)}><BiSolidChevronsLeft className='text-[25px] text-[#08c]' /></Button>
              </div>
              <Menu mode='inline' className='select-none w-full h-40 border border-base-500 overflow-y-auto' onSelect={(e) => onSelect({ path: e.keyPath, name: 'minus' })}>
                {
                  menuData['minus'].map((item, key) => (
                    <Menu.Item key={item._id}>
                      <div className='flex justify-between pr-2'>
                        <div className='flex items-center gap-2'>
                          <LuLink2 className='text-[25px] text-[#08c]' />
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </Menu.Item>
                  ))
                }
              </Menu>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-24'>
          <Button>キャンセル</Button>
          <Button onClick={onOkClick} type='primary'>保存</Button>
        </div>
      </div>
    </Modal>
  );
}

export default JointDialog;
