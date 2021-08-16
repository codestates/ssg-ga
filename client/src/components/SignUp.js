import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import theme from "../style/theme";
import swal from "sweetalert";
import axios from "axios";
import cryptojs from "crypto-js";
import { showModal, setModal } from "../actions";
import {
  validCheckEmail,
  validCheckUsername,
  validCheckPassword,
  validCheckDuplicatePassword,
} from "../utils/validCheck";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;
const Text = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9em;
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const EmailArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const UsernameArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const PasswordArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const ConfirmPasswordArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;

const Input = styled.input`
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
  border: 1.5px solid #cfd8dc;
  border-radius: 8px;
  width: 90%;
  height: 3em;
  margin: 0.4em;
`;

const DuBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-self: flex-start;
  align-self: center;
  justify-content: center;

  border-radius: 10px;
  width: 5.5em;
  background-color: #1a237e;
  color: white;
  &:hover {
    opacity: 0.9;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 1.9em 1em 0.4em 1em;
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 12em;
  height: 2.7em;
  font-size: 1em;
  background-color: #1a237e;
  color: white;
  &:hover {
    opacity: 0.9;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
  margin: 0.3em;
`;

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
  const [duplicateEmailCheck, setduplicateEmailCheck] = useState(true);
  const [duplicateUsernameCheck, setduplicateUsernameCheck] = useState(true);

  const validCheckEmailValue = validCheckEmail(inputValues.email);
  const validCheckUsernameValue = validCheckUsername(inputValues.username);
  const validCheckPwValue = validCheckPassword(inputValues.password);
  const validCheckDuplicatePwValue = validCheckDuplicatePassword(
    inputValues.password,
    inputValues.confirmPassword
  );

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
      if (validCheckEmailValue) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_END_POINT}/user/validation`,
            {
              email: inputValues.email,
            },
            {
              withCredentials: true,
            }
          );
          if (res.status === 200) {
            swal({
              title: "Available!",
              text: "사용 가능한 이메일입니다.",
              icon: "success",
              button: "확인",
            });
            setduplicateEmailCheck(false);
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
      if (validCheckUsernameValue) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_END_POINT}/user/validation`,
            {
              username: inputValues.username,
            },
            {
              withCredentials: true,
            }
          );
          console.log(res.status);
          if (res.status === 200) {
            swal({
              title: "Available!",
              text: "사용 가능한 이름입니다.",
              icon: "success",
              button: "확인",
            });
            setduplicateUsernameCheck(false);
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
          swal("이름은 3~10자 영문, 한글, 숫자 조합이어야 합니다.");
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

  const handleSignUp = async () => {
    const { email, username, password, confirmPassword } = inputValues;
    if (
      !duplicateEmailCheck &&
      !duplicateUsernameCheck &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (validCheckPwValue) {
        if (validCheckDuplicatePwValue) {
          try {
            const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
            const encryptedPassword = cryptojs.AES.encrypt(
              JSON.stringify({ password }),
              secretKey
            ).toString();
            console.log(encryptedPassword);

            const res = await axios.post(
              `${process.env.REACT_APP_END_POINT}/user/signup`,
              {
                email: email,
                username: username,
                password: encryptedPassword,
              },
              {
                withCredentials: true,
              }
            );

            if (res.status === 201) {
              swal({
                title: "Signup Success!",
                text: "가입이 완료되었습니다.",
                icon: "success",
                button: "확인",
              }).then(() => {
                swal("로그인을 진행해 주세요!");
              });
              dispatch(setModal(true));
            }
          } catch {
            swal({
              title: "Signup failed!",
              text: "가입이 실패했습니다.",
              icon: "warning",
              button: "확인",
            }).then(() => {
              swal("다시 시도해주세요");
            });
          }
        } else {
          swal({
            title: "Dismatch Password!",
            text: "비밀번호가 일치하지 않습니다.",
            icon: "warning",
            button: "확인",
          }).then(() => {
            swal("비밀번호 확인칸을 다시 입력해주세요!");
          });
        }
      } else {
        swal({
          title: "Invalid Password!",
          text: "비밀번호가 형식에 어긋납니다.",
          icon: "warning",
          button: "확인",
        }).then(() => {
          swal("비밀번호는 6 ~ 10자 영문, 숫자 조합이어야 합니다.");
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

  return (
    <>
      <Container theme={theme}>
        <Title className="SignUpTitle">
          <img src="Logo.png" width="180" height="150" />
        </Title>
        <InputArea className="inputArea">
          <EmailArea>
            <Text>이메일</Text>
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
            <Text>사용할 이름</Text>
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
          <PasswordArea>
            <Text>비밀번호</Text>
            <Input
              type="password"
              name="password"
              value={inputValues.password}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="비밀번호를 입력해주세요."
            ></Input>
          </PasswordArea>
          <ConfirmPasswordArea>
            <Text>비밀번호 확인</Text>
            <Input
              type="password"
              name="confirmPassword"
              value={inputValues.confirmPassword}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="다시 한번 비밀번호를 입력해주세요."
            ></Input>
          </ConfirmPasswordArea>
        </InputArea>
        <BtnArea className="btnArea">
          <Btn className="cancelBtn" onClick={handleCancel}>
            취소
          </Btn>
          <Btn className="signupBtn" onClick={handleSignUp}>
            회원가입
          </Btn>
        </BtnArea>
      </Container>
    </>
  );
}
