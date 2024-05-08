import React, { useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUser } from "../redux/slices/UserSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const onLogin = async () => {
    if(email.current.input.value && password.current.input.value){
      const res = await axios.post('/login', {email: email.current.input.value, password: password.current.input.value});
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      dispatch(setUser(res.data));
      Notification('Successful Login!');
      navigate('/workspace');
    }
  }

  return (
    <div className="flex justify-center items-center h-[900px]">
      <div className="flex flex-col gap-5 w-[500px] border px-10 pt-10">
        <div className="flex justify-center">
          <img src="/logo.png" className="w-24" />
        </div>
        <Input ref={email}/>
        <Input.Password ref={password} />
        <Checkbox>Remember me</Checkbox>
        <Button type="link" className="w-5 border-none">パスワードをお忘れですか？</Button>
        <div className="flex justify-center gap-5 pb-10">
          <Button type="primary" onClick={onLogin}>ログイン</Button>
          <Button type="primary" danger onClick={() => navigate('/register')}>登録</Button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;