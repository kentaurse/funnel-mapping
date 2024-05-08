import React, { useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const conformPass = useRef(null);

  const onRegister = async () => {
    if (email.current.input.value && password.current.input.value) {
      if (password.current.input.value !== conformPass.current.input.value) {
        alert('error');
        return false;
      }
      const res = await axios.post("/register", {
        name: name.current.input.value,
        email: email.current.input.value,
        password: password.current.input.value,
      });
      if(res.status == 200) {
        alert('successful.');
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[900px]">
      <div className="flex flex-col gap-5 w-[500px] border px-10 pt-10">
        <div className="flex justify-center">
          <img src="/logo.png" />
        </div>
        <p>メール</p>
        <Input ref={name} />
        <Input ref={email} />
        <Input.Password ref={password} />
        <Input.Password ref={conformPass} />
        <Checkbox>Remember me</Checkbox>
        <div className="flex justify-center gap-5 mb-10">
          <Button
            type="link"
            className="border-none"
            onClick={() => navigate("/login")}
          >
            Already registered?
          </Button>
          <Button type="primary" htmlType="submit" onClick={onRegister}>
            登録
          </Button>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
