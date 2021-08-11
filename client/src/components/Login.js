import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import axios from "axios";
import { setLogin, setModal, setProfileImage } from "../actions";

import cryptojs from "crypto-js";

axios.defaults.withCredentials = true;

export default function Login() {
  const dispatch = useDispatch();

  const setLoginState = (userData, isLogin, token) => {
    dispatch(setLogin(userData, isLogin, token));
  };
  const setProfileImageUpload = (image) => {
    dispatch(setProfileImage(image));
  };

  const startLogin = () => {
    dispatch(setModal(false));
  };

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleLogin = async () => {
    const { email, password } = inputValues;
    if (!email || !password) {
      swal({
        title: "Wrong information",
        text: "이메일과 비밀번호를 입력하세요!",
        icon: "warning",
        button: "확인",
      });
    } else {
      //FIXME 비밀번호 암호화 작동 안함!
      try {
        // const bcrypt = require("bcrypt");
        // console.log(password);
        // await bcrypt.hash(password, 10, (err, hash) => {
        //   try {
        //     password = hash;
        //     console.log(":::::" + password);
        //   } catch (err) {
        //     console.log(err);
        //   }
        // });

        // NOTE 로그인 비밀번호 암호화
        const secretKey = `${process.env.CRYPTOJS_SECRETKEY}`;
        const encryptedPassword = cryptojs.AES.encrypt(
          secretKey,
          password
        ).toString();
        console.log(encryptedPassword);

        const res = axios.post(
          `http://${process.env.REACT_APP_END_POINT}/user/signin`,
          {
            email,
            encryptedPassword,
          }
        );
        if (res.status === 200) {
          const { token } = res.data;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const res2 = axios.get(
            `http://${process.env.REACT_APP_END_POINT}/user/auth`
          );
          if (res2.status === 200) {
            const { id, username, email, image } = res2;

            setLoginState({ id, username, email }, true, token);
            setProfileImageUpload(image);
            startLogin();
          } else {
            console.log("error");
          }
        } else {
          swal({
            title: "Don't Exist!",
            text: "가입된 회원이 아닙니다!",
            icon: "warning",
            button: "확인",
          });
        }
      } catch (err) {
        swal({
          title: "Check Again!",
          text: "이메일과 비밀번호를 다시 확인하세요!",
          icon: "warning",
          button: "확인",
        });
      }
    }
  };
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=https://localhost:3000`;

  const handleKakaoLogin = async () => {
    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <>
      <Container>
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
          <CacaoBtn className="kakaoLoginBtn" onClick={handleKakaoLogin}>
            카카오 로그인
          </CacaoBtn>
          <SignupBtn className="signupBtn" onClick={() => startLogin(true)}>
            회원가입
          </SignupBtn>
        </BtnArea>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  display: flex;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
  width: 15em;
  height: 2em;
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
