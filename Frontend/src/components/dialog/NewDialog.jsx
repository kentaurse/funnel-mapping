import React, { useState } from 'react';
import { Button, Input, Select, Modal, Divider } from 'antd';
import ColorButton from "src/components/common/ColorButton";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setViewMode, addOpenFiles, removeOpenFiles, setTempFile, setSelectFile, onFileWndLoading, setRedo, setUndo, setInitialCanvas } from 'src/redux/slices/PageSlice';
const { TextArea } = Input;

const NewDialog = ({ open, onOk, onCancel, flag = false }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const { selectFolder } = useSelector(state => state.page);
  const [colors, setColors] = useState({
    theme: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    tag: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    list: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    field: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
  });
  const colorSettings = ['テーマ', 'タグ', 'リスト', 'フィールド'];
  const type = ['theme', 'tag', 'list', 'field'];

  const options = [
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/1.png' className='h-4' />
        <p>プロジェクト</p>
      </div>,
      value: 1,
    },
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/2.png' className='h-4' />
        <p>シナリオ</p>
      </div>,
      value: 2,
    },
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/1.png' className='h-4' />
        <p>フォーム</p>
      </div>,
      value: 3,
    },
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/1.png' className='h-4' />
        <p>予約</p>
      </div>,
      value: 4,
    },
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/1.png' className='h-4' />
        <p>プロモーション </p>
      </div>,
      value: 5,
    },
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/1.png' className='h-4' />
        <p>Automation </p>
      </div>,
      value: 6,
    },
    {
      label: <div className='flex gap-2 items-center'>
        <img src='fheader/1.png' className='h-4' />
        <p>インポート </p>
      </div>,
      value: 7,
    },
  ];

  const handleColorChange = (type, index) => (color) => {
    setColors(prevColors => ({
      ...prevColors,
      [type]: prevColors[type].map((c, i) => (i === index ? color : c))
    }));
  };

  const renderColorButtons = (type) => {
    return colors[type].map((color, index) => (
      <ColorButton key={index} color={color} setColor={handleColorChange(type, index)} isBorder={index === 1} />
    ));
  };

  const onSaveFile = async () => {
    if (name !== '') {
      const item = await axios.post('/file', { name: name, classify: 'work', parentId: selectFolder, isDirectory: false });
      if (flag) {
        dispatch(onFileWndLoading());
        dispatch(addOpenFiles({ key: item.data._id, name: name }));
        dispatch(setSelectFile(item.data._id));
        dispatch(setTempFile(null));
      }
      onOk();
    } else Notification('Please input file name!', 'warn');
  }
  return (
    <Modal className='select-none' centered open={open} onOk={onOk} onCancel={onCancel} footer={false}>
      <h3 className='text-center pt-5'>新規追加</h3>
      <Divider />
      <div className='flex flex-col gap-y-3 px-10'>
        <div>
          <div className='flex gap-2'>タイトル <p className='text-red-500'>*</p></div>
          <Input type="text" onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <div className='flex gap-2'>タイプ <p className='text-red-500'>*</p></div>
          <Select className='w-full' options={options} />
        </div>
        <div>
          <div className='flex gap-2'>インポートURL <p className='text-red-500'>*</p></div>
          <Input type="text" />
        </div>
        <div className='flex gap-2'>
          <div className='pr-5'>カラー設定</div>
          <div className='flex flex-col gap-5'>
            {colorSettings.map((item, index) => (
              <div key={index} className='flex gap-4'>
                <p className='w-[70px]'>{item}</p>
                {renderColorButtons(type[index])}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>説明文</div>
          <TextArea rows={3} />
        </div>
        <div className='flex justify-center gap-14'>
          <Button>キャンセル</Button>
          <Button type='primary' onClick={onSaveFile}>保存</Button>
        </div>
      </div>
    </Modal>
  );
}

export default NewDialog;
