import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import axios from "axios";
import { setModal } from "../actions";

export default function Login({ handleClickModal }) {
  const dispatch = useDispatch();

  const setLogin = (userData, isLogin, token) => {
    dispatch({ type: "SET_LOGIN_STATE", userData, isLogin, token });
  };
  const setProfileImage = (image) => {
    dispatch({ type: "SET_PROFILE_IMAGE", image });
  };

  const startLogin = () => {
    dispatch(setModal(false));
  };

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleLogin = () => {
    console.log(inputValues);
    const { email, password } = inputValues;
    if (!email || !password) {
      swal({
        title: "Wrong information",
        text: "이메일과 비밀번호를 확인하세요!",
        icon: "warning",
        button: "확인",
      });
    }
    try {
      const res = axios.post(
        `https://api.ssg-ga.click/user/signin`,
        {
          email,
          password,
        },
        {
          withCredential: true,
        }
      );
      if (res.status === 200) {
        // handleResponseSuccess(res.data);
      } else {
        swal({
          // title: "Wrong information",
          text: "가입된 회원이 아닙니다!",
          icon: "warning",
          button: "확인",
        });
      }
    } catch (err) {
      swal({
        title: "Wrong information",
        text: "이메일과 비밀번호를 다시 확인하세요!",
        icon: "warning",
        button: "확인",
      });
    }
  };

  return (
    <>
      <Title className="loginTitle">Logo!</Title>
      <InputArea className="inputArea">
        <Input
          type="text"
          name="email"
          value={inputValues.email}
          onChange={handleOnChange}
          onKeyPress={pressEnter}
          placeholder="이메일을 입력해주세요."
        ></Input>
        <Input
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleOnChange}
          onKeyPress={pressEnter}
          placeholder="비밀번호를 입력해주세요."
        ></Input>
      </InputArea>
      <BtnArea className="btnArea">
        <LoginBtn className="loginBtn" onClick={handleLogin}>
          로그인
        </LoginBtn>
        <CacaoBtn className="kakaoLoginBtn">카카오 로그인</CacaoBtn>
        <SignupBtn className="signupBtn" onClick={() => startLogin(true)}>
          회원가입
        </SignupBtn>
      </BtnArea>
    </>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  display: flex;
  border: 1px solid black;
  border-radius: 8px;
  width: 15em;
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
`;

const CacaoBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
`;

const SignupBtn = styled.button`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-self: center;
`;
