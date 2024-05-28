import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Divider, Menu } from 'antd';
import { FaPlusCircle, FaListAlt, FaEdit, FaTable, FaCloudDownloadAlt, FaRecycle } from "react-icons/fa";
import { LuMousePointerClick, LuLink2, LuShare2, LuTrash2 } from "react-icons/lu";
import { BiSolidChevronsLeft, BiSolidChevronsRight } from "react-icons/bi";
import { SearchOutlined, UndoOutlined, FilterOutlined } from '@ant-design/icons';
import { VscTag } from "react-icons/vsc";
import axios from 'axios';
const { SubMenu } = Menu;

const JointDialog = ({ open, onOk, onCancel }) => {
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState({});

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
  
  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log(item);
    console.log(key);
    console.log(keyPath);
    console.log(selectedKeys);
    console.log(domEvent);
  }
 
  const getCategoryList = async () => {
    try {
      const response = await axios.get('/category');
      const allData = response.data;

      // Filter out parent categories
      const tempParents = allData.filter(item => item.isParent === true);
      setParents(tempParents);

      // Create an object to store children by parentId
      const tempChildren = {};
      tempParents.forEach(parent => {
        tempChildren[parent._id] = allData.filter(item => item.isParent !== true && item.parentId === parent._id);
      });

      // Set the children state
      setChildren(tempChildren);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, [])

  return (
    <Modal className='select-none' centered open={open} onOk={onOk} onCancel={onCancel} footer={false} width={700}>
      <h3 className='text-center pt-5'>ジョイント右２ アクション設定</h3>
      <Divider />
      <div className='flex flex-col gap-5'>
        <div className='flex gap-10'>
          <div className='w-[300px] border border-base-500'>
            <div className='flex justify-end gap-2 border-t-4 border-blue-500 px-5 py-2'>
              <button><UndoOutlined className='text-[25px]'/></button>
              <button><FilterOutlined className='text-[25px]'/></button>
              <button><SearchOutlined className='text-[25px]'/></button>
            </div>
            <div className='h-[400px] overflow-y-auto no-scrollbar border-t'>
              <Menu mode='inline' className='select-none' onSelect={onSelect}>
                {parents.map(item, key => {
                  <SubMenu key={key} title={
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <VscTag className='text-[25px] text-[#08c]'/>
                        <p>タグ</p>
                      </div>
                      <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                    </div>
                  }>

                  </SubMenu>  
                })}
                <SubMenu key={'1'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <VscTag className='text-[25px] text-[#08c]'/>
                      <p>タグ</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                  </div>
                }>
                  <Menu.Item key={'1-1'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <LuLink2 className='text-[25px] text-[#08c]'/>
                        <p>タグAAAA</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'1-2'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <LuLink2 className='text-[25px] text-[#08c]'/>
                        <p>セミナーA</p>
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key={'2'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <FaListAlt className='text-[25px] text-[#08c]'/>
                      <p>リスト</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                  </div>
                }>
                  <Menu.Item key={'2-1'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <LuLink2 className='text-[25px] text-[#08c]'/>
                        <p>リストAAAA</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'2-2'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key={'3'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <FaEdit className='text-[25px] text-[#08c]'/>
                      <p>フィールド</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                  </div>
                }>
                  <Menu.Item key={'3-1'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'3-2'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'3-3'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'3-4'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>
              </Menu>
              {/* <Menu mode='inline' className='select-none' onSelect={onSelect}>
                <SubMenu key={'1'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <VscTag className='text-[25px] text-[#08c]'/>
                      <p>タグ</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                  </div>
                }>
                  <Menu.Item key={'1-1'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <LuLink2 className='text-[25px] text-[#08c]'/>
                        <p>タグAAAA</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'1-2'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <LuLink2 className='text-[25px] text-[#08c]'/>
                        <p>セミナーA</p>
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key={'2'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <FaListAlt className='text-[25px] text-[#08c]'/>
                      <p>リスト</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                  </div>
                }>
                  <Menu.Item key={'2-1'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <LuLink2 className='text-[25px] text-[#08c]'/>
                        <p>リストAAAA</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'2-2'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key={'3'} title={
                  <div className='flex justify-between pr-2'>
                    <div className='flex items-center gap-2'>
                      <FaEdit className='text-[25px] text-[#08c]'/>
                      <p>フィールド</p>
                    </div>
                    <button onClick={addFile}><FaPlusCircle className='text-[25px] text-[#08c]'/></button>
                  </div>
                }>
                  <Menu.Item key={'3-1'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'3-2'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'3-3'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key={'3-4'}>
                    <div className='flex justify-between pr-2'>
                      <div className='flex items-center gap-2'>
                        <p className='pl-[32px]'>リストBBBB</p>
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>
              </Menu> */}
            </div>
          </div>

          <div className='w-[340px]'>
            <p className='pl-[80px] pt-4'>追加アクション</p>
            <div className='flex items-center gap-5'>
              <div className='flex flex-col gap-2'>
                <Button><BiSolidChevronsRight className='text-[25px] text-[#08c]'/></Button>
                <Button><BiSolidChevronsLeft className='text-[25px] text-[#08c]'/></Button>
              </div>
              <div className='w-full h-40 border border-base-500'></div>
            </div>
            <p className='pl-[80px] pt-10'>削減アクション</p>
            <div className='flex items-center gap-5'>
              <div className='flex flex-col gap-2'>
                <Button><BiSolidChevronsRight className='text-[25px] text-[#08c]'/></Button>
                <Button><BiSolidChevronsLeft className='text-[25px] text-[#08c]'/></Button>
              </div>
              <div className='w-full h-40 border border-base-500'></div>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-24'>
          <Button>キャンセル</Button>
          <Button type='primary'>保存</Button>
        </div>
      </div>
    </Modal>
  );
}

export default JointDialog;
