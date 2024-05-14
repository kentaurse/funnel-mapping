import React from 'react';
import { Button, Input, Modal, Divider } from 'antd';
import { BsCopy } from "react-icons/bs";

const ShareDialog = ({ open, onOk, onCancel }) => {
  return (
    <Modal className='select-none' centered open={open} onOk={onOk} onCancel={onCancel} footer={false}>
      <h3 className='text-center pt-5'>シェア設定</h3>
      <Divider />
      <div className='flex flex-col gap-y-5 px-10'>
        <div>
          <div className='flex gap-2'>表示用URL</div>
          <div className='flex gap-3'>
            <Input type="text" />
            <button><BsCopy className='text-[30px] text-[#08c]' /></button>
          </div>
        </div>
        <div>
          <div className='flex gap-2'>エクスポート用URL</div>
          <div className='flex gap-3'>
            <Input type="text" />
            <button><BsCopy className='text-[30px] text-[#08c]' /></button>
          </div>
        </div>
        <div className='flex justify-center gap-14'>
          <Button>閉じる</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ShareDialog;
