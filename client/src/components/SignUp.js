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
  @media ${(props) => props.theme.minimum} {
    margin: 0em 0em 1.5em 0em;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0em 0em 1.5em 0em;
  }
`;
const Text = styled.span`
  grid-area: Text;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  place-self: center;
  font-size: 0.9em;
  @media ${(props) => props.theme.minimum} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
  @media ${(props) => props.theme.tablet} {
    width: auto;
    place-self: center;
    justify-self: flex-end;
  }
  @media ${(props) => props.theme.desktop} {
    width: auto;
    place-self: center;
    justify-self: flex-end;
  }
`;
const SingleInput = styled.div`
  display: grid;
  > #validCheckMobile {
    text-align: center;
    font-size: 0.7rem;
    margin-bottom: 0.5em;
    @media ${(props) => props.theme.tablet} {
      display: none;
    }
    @media ${(props) => props.theme.desktop} {
      display: none;
    }
  }
  &#validCheck {
    > div {
      grid-column-start: 1;
      grid-column-end: span 3;
      text-align: center;
      font-size: 0.8rem;
    }
    @media ${(props) => props.theme.minimum} {
      display: none;
    }
    @media ${(props) => props.theme.mobile} {
      display: none;
    }
  }

  @media ${(props) => props.theme.minimum} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 0.1fr;
    grid-template-areas: "Middle" "DuBtn";
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 0.4fr;
    grid-template-areas: "Middle" "DuBtn";
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "Text Middle DuBtn";
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "Text Middle DuBtn";
  }
`;
const SignUpArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.minimum} {
    width: auto;
  }
  @media ${(props) => props.theme.mobile} {
    width: auto;
  }
  @media ${(props) => props.theme.tablet} {
    width: auto;
  }
  @media ${(props) => props.theme.desktop} {
    width: auto;
  }
`;

const Input = styled.input`
  grid-area: Middle;
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
  border: 1.5px solid #cfd8dc;
  border-radius: 5px;
  height: 3em;
  margin: 0.7em 0 0.5em 0;
  @media ${(props) => props.theme.minimum} {
    width: 16em;
    height: 1.7em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 18em;
    height: 2.3em;
  }
  @media ${(props) => props.theme.tablet} {
    width: 19em;
    margin: 0.7em 1.5em 0.5em 1.5em;
  }
  @media ${(props) => props.theme.desktop} {
    width: 19em;
    margin: 0.7em 1.5em 0.5em 1.5em;
  }
`;

const DuBtn = styled.button`
  width: auto;
  grid-area: DuBtn;
  cursor: pointer;
  display: flex;
  justify-self: flex-start;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 5.5em;
  height: 2em;

  @media ${(props) => props.theme.minimum} {
    place-self: center;
    font-size: 0.7em;
    border: none;
    text-decoration: underline;
    color: white;
    margin-bottom: 0.5em;
    &:hover {
      color: #ff71ce;
      font-weight: bold;
    }
    &:focus {
      outline: none;
    }
  }
  @media ${(props) => props.theme.mobile} {
    place-self: center;
    height: 0.8em;
    font-size: 0.8em;
    border: none;
    text-decoration: underline;
    color: white;
    margin-bottom: 0.5em;
    &:hover {
      color: #ff71ce;
      font-weight: bold;
    }
    &:focus {
      outline: none;
    }
  }
  @media ${(props) => props.theme.tablet} {
    width: auto;
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
  }
  @media ${(props) => props.theme.desktop} {
    width: auto;
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
  }
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 1.9em 1em 0.4em 1em;
  @media ${(props) => props.theme.minimum} {
    margin: 0em 1em 0.4em 1em;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0em 1em 0.4em 1em;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 17.5em;
  height: 2.5em;
  font-size: 0.9em;
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
  margin: 0.5em;
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
              text: "?????? ????????? ??????????????????.",
              icon: "success",
              button: "??????",
            });
            setduplicateEmailCheck(false);
          }
        } catch (err) {
          swal({
            title: "Already in use!",
            text: "?????? ??????????????????.",
            icon: "warning",
            button: "??????",
          });
        }
      } else {
        swal({
          title: "Not valid",
          text: "???????????? ?????? ??????????????????.",
          icon: "warning",
          button: "??????",
        }).then(() => {
          swal("????????? ????????? ???????????????!");
        });
      }
    } else {
      swal({
        title: "Email plz!",
        text: "???????????? ??????????????????.",
        icon: "warning",
        button: "??????",
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

          if (res.status === 200) {
            swal({
              title: "Available!",
              text: "?????? ????????? ???????????????.",
              icon: "success",
              button: "??????",
            });
            setduplicateUsernameCheck(false);
          }
        } catch (err) {
          swal({
            title: "Already in use!",
            text: "?????? ??????????????????.",
            icon: "warning",
            button: "??????",
          });
        }
      } else {
        swal({
          title: "Not valid",
          text: "???????????? ?????? ???????????????.",
          icon: "warning",
          button: "??????",
        }).then(() => {
          swal("????????? 3~10??? ??????, ??????, ?????? ??????????????? ?????????.");
        });
      }
    } else {
      swal({
        title: "Name plz!",
        text: "????????? ??????????????????.",
        icon: "warning",
        button: "??????",
      });
    }
  };

  const handleSignUp = async () => {
    const { email, username, password, confirmPassword } = inputValues;
    if (
      email !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (!duplicateEmailCheck) {
        if (!duplicateUsernameCheck) {
          if (validCheckPwValue) {
            if (validCheckDuplicatePwValue) {
              try {
                const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
                const encryptedPassword = cryptojs.AES.encrypt(
                  JSON.stringify({ password }),
                  secretKey
                ).toString();

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
                    text: "????????? ?????????????????????.",
                    icon: "success",
                    button: "??????",
                  }).then(() => {
                    swal("???????????? ????????? ?????????!");
                  });
                  dispatch(setModal(true));
                }
              } catch {
                swal({
                  title: "Signup failed!",
                  text: "????????? ??????????????????.",
                  icon: "warning",
                  button: "??????",
                }).then(() => {
                  swal("?????? ??????????????????");
                });
              }
            } else {
              swal({
                title: "Dismatch Password!",
                text: "??????????????? ???????????? ????????????.",
                icon: "warning",
                button: "??????",
              }).then(() => {
                swal("???????????? ???????????? ?????? ??????????????????!");
              });
            }
          } else {
            swal({
              title: "Invalid Password!",
              text: "??????????????? ????????? ???????????????.",
              icon: "warning",
              button: "??????",
            }).then(() => {
              swal(
                "??????????????? 8??? ?????? ??????, ??????,???????????? ??????????????? ?????????."
              );
            });
          }
        } else {
          swal({
            title: "Check Username!",
            text: "???????????? ??????????????? ????????????",
            icon: "warning",
            button: "??????",
          });
        }
      } else {
        swal({
          title: "Check Email!",
          text: "????????? ??????????????? ????????????!",
          icon: "warning",
          button: "??????",
        });
      }
    } else {
      swal({
        title: "Insufficient input!",
        text: "?????? ????????? ?????? ???????????????.",
        icon: "warning",
        button: "??????",
      }).then(() => {
        swal("?????? ?????? ???????????????!");
      });
    }
  };

  return (
    <>
      <Container theme={theme}>
        <Title className="SignUpTitle">
          <img src="../Logo.png" width="180" height="80" alt="ssg-ga-logo" />
        </Title>
        <SignUpArea>
          <InputArea className="inputArea" theme={theme}>
            <SingleInput theme={theme}>
              <Text theme={theme}>?????????</Text>
              <Input
                theme={theme}
                type="text"
                name="email"
                value={inputValues.email}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="???????????? ??????????????????."
              ></Input>
              <DuBtn
                theme={theme}
                className="checkDuplicateEmailBtn"
                onClick={handleCheckEmail}
              >
                ????????????
              </DuBtn>
            </SingleInput>
            <SingleInput theme={theme}>
              <Text theme={theme}>????????? ??????</Text>
              <Input
                theme={theme}
                type="text"
                name="username"
                value={inputValues.username}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="????????? ??????????????????."
              ></Input>
              <DuBtn
                theme={theme}
                className="checkDuplicateUsernameBtn"
                onClick={handleCheckUsername}
              >
                ????????????
              </DuBtn>
            </SingleInput>
            <SingleInput theme={theme}>
              <Text theme={theme}>????????????</Text>
              <Input
                theme={theme}
                type="password"
                name="password"
                value={inputValues.password}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="??????????????? ??????????????????."
              ></Input>
              <div id="validCheckMobile">8??? ?????? ??????, ??????, ???????????? ??????</div>
            </SingleInput>
            <SingleInput theme={theme} id="validCheck">
              <div>8??? ?????? ??????, ??????, ???????????? ??????</div>
            </SingleInput>
            <SingleInput theme={theme}>
              <Text theme={theme}>???????????? ??????</Text>
              <Input
                theme={theme}
                type="password"
                name="confirmPassword"
                value={inputValues.confirmPassword}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="?????? ?????? ??????????????? ??????????????????."
              ></Input>
            </SingleInput>
          </InputArea>
          <BtnArea theme={theme} className="btnArea">
            <Btn className="cancelBtn" onClick={handleCancel}>
              ??????
            </Btn>
            <Btn className="signupBtn" onClick={handleSignUp}>
              ????????????
            </Btn>
          </BtnArea>
        </SignUpArea>
      </Container>
    </>
  );
}
