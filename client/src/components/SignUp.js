import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import axios from "axios";
import cryptojs from "crypto-js";
import { showModal } from "../actions";
import {
  validCheckEmail,
  validCheckUsername,
  validCheckPassword,
  validCheckDuplicatePassword,
} from "../utils/validCheck";

export default function SignUp() {
  const dispatch = useDispatch();

  const userInfoInit = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [inputValues, setInputValues] = useState(userInfoInit);
  console.log(inputValues);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") handleSignUp();
  };

  const handleCancel = () => {
    setInputValues(userInfoInit);
    dispatch(showModal(false));
  };

  const handleCheckEmail = async () => {
    if (inputValues.email !== "") {
      console.log(inputValues.email);
      if (validCheckEmail(inputValues.email)) {
        console.log(validCheckEmail(inputValues.email));
        try {
          console.log(inputValues.email);
          const res = await axios.post(
            `http://${process.env.REACT_APP_END_POINT}/user/validation`,
            {
              email: inputValues.email,
            },
            {
              withCredentials: true,
            }
          );
          console.log(res);
          console.log(res.status);
          if (res.status === 200) {
            swal({
              title: "Available!",
              text: "사용 가능한 이메일입니다.",
              icon: "success",
              button: "확인",
            });
          }
        } catch (err) {
          swal({
            title: "Already in use!",
            text: "이미 사용중입니다.",
            icon: "warning",
            button: "확인",
          });
        }
      } else {
        swal({
          title: "Not valid",
          text: "유효하지 않은 이메일입니다.",
          icon: "warning",
          button: "확인",
        }).then(() => {
          swal("이메일 형식을 맞춰주세요!");
        });
      }
    } else {
      swal({
        title: "Email plz!",
        text: "이메일을 입력해주세요.",
        icon: "warning",
        button: "확인",
      });
    }
  };

  const handleCheckUsername = async () => {
    if (inputValues.username !== "") {
      if (validCheckUsername(inputValues.username)) {
        try {
          const res = await axios.post(
            `http://${process.env.REACT_APP_END_POINT}/user/validation`,
            {
              username: inputValues.username,
            },
            {
              withCredentials: true,
            }
          );
          if (res.status === 200) {
            swal({
              title: "Available!",
              text: "사용 가능한 이름입니다.",
              icon: "success",
              button: "확인",
            });
          }
        } catch (err) {
          swal({
            title: "Already in use!",
            text: "이미 사용중입니다.",
            icon: "warning",
            button: "확인",
          });
        }
      } else {
        swal({
          title: "Not valid",
          text: "유효하지 않은 이름입니다.",
          icon: "warning",
          button: "확인",
        }).then(() => {
          swal("이름은 4~8자 영문, 한글, 숫자 조합이어야 합니다.");
        });
      }
    } else {
      swal({
        title: "Name plz!",
        text: "이름을 입력해주세요.",
        icon: "warning",
        button: "확인",
      });
    }
  };

  const handleSignUp = () => {};

  return (
    <>
      <Container>
        <Title className="SignUpTitle">Logo!</Title>
        <InputArea className="inputArea">
          <EmailArea>
            <Input
              type="text"
              name="email"
              value={inputValues.email}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="이메일을 입력해주세요."
            ></Input>
            <DuBtn
              className="checkDuplicateEmailBtn"
              onClick={handleCheckEmail}
            >
              중복확인
            </DuBtn>
          </EmailArea>
          <UsernameArea>
            <Input
              type="text"
              name="username"
              value={inputValues.username}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="이름을 입력해주세요."
            ></Input>
            <DuBtn
              className="checkDuplicateUsernameBtn"
              onClick={handleCheckUsername}
            >
              중복확인
            </DuBtn>
          </UsernameArea>

          <Input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={handleOnChange}
            onKeyPress={pressEnter}
            placeholder="비밀번호를 입력해주세요."
          ></Input>
          <Input
            type="password"
            name="confirmPassword"
            value={inputValues.confirmPassword}
            onChange={handleOnChange}
            onKeyPress={pressEnter}
            placeholder="다시 한번 비밀번호를 입력해주세요."
          ></Input>
        </InputArea>
        <BtnArea className="btnArea">
          <CancelBtn className="cancelBtn" onClick={handleCancel}>
            취소
          </CancelBtn>
          <SignupBtn className="signupBtn" onClick={handleSignUp}>
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
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const EmailArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const UsernameArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Input = styled.input`
  display: flex;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  width: 20em;
  height: 2em;
`;

const DuBtn = styled.button`
  cursor: pointer;
  display: flex;
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const CancelBtn = styled.button`
  cursor: pointer;
  display: flex;
`;

const SignupBtn = styled.button`
  cursor: pointer;
  display: flex;
`;
