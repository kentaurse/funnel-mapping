import React, { useState } from 'react';
import { Upload, Button, Avatar } from 'antd';
import axios from 'axios';

const Exp = () => {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const handleReset = async () => {
    setFileList([]);
    setImageUrl(null);
    const res = await axios.get('/exp');
  };

  const handleFileUpload = async ({ file }) => {
    const url = URL.createObjectURL(file)
    setImageUrl(url);
    setFileList([file]);
  };

  return (
    <div className='flex flex-col'>
      <Upload
        onChange={handleFileUpload}
        beforeUpload={() => false}
        showUploadList={false}
      >
        <Button className='w-80 h-80 rounded-full p-0'>
          {imageUrl ? <Avatar src={imageUrl} className='w-full h-full' /> : '+' }
        </Button>
      </Upload>
      <Button className='w-52' onClick={handleReset}>Reset</Button>
    </div>
  );
};

export default Exp;