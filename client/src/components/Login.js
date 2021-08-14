import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import axios from "axios";
import { setLogin, setModal, setProfileImage, showModal } from "../actions";

import cryptojs from "crypto-js";

axios.defaults.withCredentials = true;

export default function Login() {
  const dispatch = useDispatch();

  const setLoginState = (userData, isLogin) => {
    dispatch(setLogin(userData, isLogin));
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
    console.log(email, password);
    if (email !== "" && password !== "") {
      try {
        const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
        const encryptedPassword = cryptojs.AES.encrypt(
          JSON.stringify({ password }),
          secretKey
        ).toString();
        console.log(encryptedPassword);

        const res = await axios.post(
          `${process.env.REACT_APP_END_POINT}/user/signin`,
          {
            email: email,
            password: encryptedPassword,
          }
        );

        if (res.status === 200) {
          try {
            const res2 = await axios.get(
              `${process.env.REACT_APP_END_POINT}/user/auth`
            );

            if (res2.status === 200) {
              swal({
                title: "Login Success!",
                text: "로그인에 성공하였습니다!",
                icon: "success",
                button: "확인",
              });

              const { id, username, email, image } = res2.data.data;
              setLoginState({ id, username, email }, true);
              setProfileImageUpload(image);
              dispatch(showModal(false));
            }
          } catch (error) {
            swal({
              title: "Login Failed!",
              text: "로그인에 실패하였습니다!",
              icon: "warning",
              button: "확인",
            });
          }
        }
      } catch (err) {
        console.log(err);
        swal({
          title: "Check Again!",
          text: "이메일과 비밀번호를 다시 확인하세요!",
          icon: "warning",
          button: "확인",
        });
      }
    } else {
      swal({
        title: "Insufficient input!",
        text: "모든 사항은 필수 입력입니다.",
        icon: "warning",
        button: "확인",
      }).then(() => {
        swal("모든 칸을 채워주세요!");
      });
    }
  };

  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/&response_type=code&state`;

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
