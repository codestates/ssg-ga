import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../style/theme";
import swal from "sweetalert";
import axios from "axios";
import { setLogin, setModal, setProfileImage, showModal } from "../actions";
import cryptojs from "crypto-js";
axios.defaults.withCredentials = true;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  z-index: 55;
  animation: fadein 2s;
  -moz-animation: fadein 2s;
  -webkit-animation: fadein 2s;
  -o-animation: fadein 2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media ${(props) => props.theme.minimum} {
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
  @media ${(props) => props.theme.tablet} {
    width: 30em;
  }
  @media ${(props) => props.theme.desktop} {
    width: 30em;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.8em 0.8em 2.7em 0.8em;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5em 0.8em 0.5em 0.6em;
`;
const EmailArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
const PasswordArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  display: flex;
  text-align: center;
  border: 1.5px solid #cfd8dc;
  border-radius: 5px;
  width: 25em;
  height: 3.3em;
  margin: 0.5em 0.8em 0.5em 0.6em;
  @media ${(props) => props.theme.minimum} {
    width: 15em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 21em;
  }
  @media ${(props) => props.theme.tablet} {
    width: 25em;
  }
  @media ${(props) => props.theme.desktop} {
    width: 25em;
  }
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.3em 0.8em 0.5em 0.6em;
`;

const LoginBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 21em;
  border-radius: 5px;
  font-size: 1em;
  margin: 0.5em 0em 0.5em 0em;
  color: #ff71ce;
  background-color: #212121;
  border: 2px solid #ff71ce;

  &:hover {
    font-weight: bold;
    -moz-box-shadow: 0 0 5px 5px #ff71ce;
    -webkit-box-shadow: 0 0 5px 5px #ff71ce;
    box-shadow: 0 0 5px 5px #ff71ce;
  }
  &:focus {
    outline: none;
  }
  @media ${(props) => props.theme.minimum} {
    width: 18em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 18em;
  }
  @media ${(props) => props.theme.tablet} {
    width: 21em;
  }
  @media ${(props) => props.theme.desktop} {
    width: 21em;
  }
`;

const CacaoBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 21em;
  border-radius: 5px;
  font-size: 1em;
  margin: 0.2em 0em 0.5em 0em;
  color: #fdd835;
  background-color: #212121;
  border: 2px solid #fdd835;
  &:hover {
    font-weight: bold;
    -moz-box-shadow: 0 0 5px 5px #fdd835;
    -webkit-box-shadow: 0 0 5px 5px #fdd835;
    box-shadow: 0 0 5px 5px #fdd835;
  }
  &:focus {
    outline: none;
  }
  @media ${(props) => props.theme.minimum} {
    width: 16em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 18em;
  }
  @media ${(props) => props.theme.tablet} {
    width: 21em;
  }
  @media ${(props) => props.theme.desktop} {
    width: 21em;
  }
`;

const SignUpMessage = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5em 0em 0.5em 0em;
`;
const SignupBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 21em;
  border-radius: 5px;
  font-size: 1em;
  margin: 0.3em 0em 0.8em 0em;
  color: #ff71ce;
  background-color: #212121;
  border: 2px solid #ff71ce;

  &:hover {
    font-weight: bold;
    -moz-box-shadow: 0 0 5px 5px #ff71ce;
    -webkit-box-shadow: 0 0 5px 5px #ff71ce;
    box-shadow: 0 0 5px 5px #ff71ce;
  }
  &:focus {
    outline: none;
  }
  @media ${(props) => props.theme.minimum} {
    width: 16em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 18em;
  }
  @media ${(props) => props.theme.tablet} {
    width: 21em;
  }
  @media ${(props) => props.theme.desktop} {
    width: 21em;
  }
`;

export default function Login() {
  const history = useHistory();
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
              history.push("/main");
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

  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=https://ssg-ga.click/&response_type=code&state`;

  const handleKakaoLogin = async () => {
    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <>
      <Container theme={theme}>
        <Title className="loginTitle">
          <img src="../Logo.png" width="180" height="80" />
        </Title>
        <InputArea className="inputArea">
          <EmailArea>
            <Input
              theme={theme}
              type="text"
              name="email"
              value={inputValues.email}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="이메일을 입력해주세요."
            ></Input>
          </EmailArea>
          <PasswordArea>
            <Input
              theme={theme}
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="비밀번호를 입력해주세요."
            ></Input>
          </PasswordArea>
        </InputArea>
        <BtnArea className="btnArea">
          <LoginBtn theme={theme} className="loginBtn" onClick={handleLogin}>
            로그인
          </LoginBtn>
          <CacaoBtn
            theme={theme}
            className="kakaoLoginBtn"
            onClick={handleKakaoLogin}
          >
            카카오 로그인
          </CacaoBtn>
          <SignUpMessage>아직 회원이 아니신가요?</SignUpMessage>
          <SignupBtn
            theme={theme}
            className="signupBtn"
            onClick={() => startLogin(true)}
          >
            회원가입
          </SignupBtn>
        </BtnArea>
      </Container>
    </>
  );
}
