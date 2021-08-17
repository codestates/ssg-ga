import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../style/theme";
import swal from "sweetalert";
import axios from "axios";
import cryptojs from "crypto-js";
import {
  changeUsername,
  changeProfileImage,
  deleteProfileImage,
  deleteUser,
} from "../actions";
import {
  validCheckUsername,
  validCheckPassword,
  validCheckDuplicatePassword,
} from "../utils/validCheck";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3em 0em 2em 0em;
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #cfd8dc;

  width: 11rem;
  height: 11rem;

  border-radius: 50%;
  overflow: hidden;
`;
const Profile = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Label = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  width: 4em;
  height: 2.5em;
  font-size: 0.9em;
  background-color: #1a237e;
  color: white;
  &:hover {
    opacity: 0.9;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
  margin: 1em;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  margin: 0.8em 0.4em 1em 0.5em;
`;
const Text = styled.span`
  display: flex;
  place-self: center;
  font-size: 0.9em;
`;

const DefaultValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3em;
`;

const EditArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const EmailArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const CurrrentUsernameArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const ChangeUsernameArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const CurrentPasswordArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const NewPasswordArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;
const ConfirmNewPasswordArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;

const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
  border: 1.5px solid #cfd8dc;
  border-radius: 8px;
  width: 20em;
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
  width: 7em;
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
  height: 2.5em;
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
const UserDeleteArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10em 0.8em 2em 0.6em;
`;

const UserDeleteBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-radius: 10px;
  width: 15em;
  height: 2.5em;
  font-size: 0.9em;
  &:hover {
    color: white;
  }
  &:focus {
    outline: none;
  }
  margin: 0.5em 0.4em 0.3em 1.9em;
`;

const UserDeletePassword = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
`;

export default function UserEdit() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfoInit = {
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    confirmUserPassword: "",
  };

  const [inputValues, setInputValues] = useState(userInfoInit);
  const [duplicateUsernameCheck, setduplicateUsernameCheck] = useState(true);
  const [userCheckPw, setUserCheckPw] = useState(false);
  const fileInput = useRef(null);
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);
  const { id, username, email } = state.userData;
  const { image } = profile;

  const [profileImage, setImage] = useState(image);
  const validCheckUsernameValue = validCheckUsername(inputValues.username);
  const validCheckPwValue = validCheckPassword(inputValues.newPassword);
  const validCheckDuplicatePwValue = validCheckDuplicatePassword(
    inputValues.newPassword,
    inputValues.confirmNewPassword
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") handleUserInfoEdit();
  };

  const handleUploadProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", fileInput.current.files[0]);

      let response = await axios.post(
        `${process.env.REACT_APP_END_POINT}/user/image`,
        formData
      );
      if (response.status === 200) {
        setImage(response.data.data.url);
      }
    } catch (error) {
      swal({
        title: "Error!",
        text: "예상치못한 에러가 발생하였습니다.",
        icon: "danger",
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

  const handleCancel = () => {
    setInputValues(userInfoInit);
    history.push("/mypage");
  };

  const handleUserInfoEdit = async () => {
    const { username, currentPassword, newPassword, confirmNewPassword } =
      inputValues;
    if (currentPassword !== "") {
      if (username !== "") {
        if (!duplicateUsernameCheck) {
          if (validCheckPwValue) {
            if (validCheckDuplicatePwValue) {
              // 닉네임 & 비밀번호 변경
              try {
                const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
                const encryptedPassword = cryptojs.AES.encrypt(
                  JSON.stringify({ password: currentPassword }),
                  secretKey
                ).toString();

                const newEncryptedPassword = cryptojs.AES.encrypt(
                  JSON.stringify({ password: confirmNewPassword }),
                  secretKey
                ).toString();

                const res = await axios.patch(
                  `${process.env.REACT_APP_END_POINT}/user`,
                  {
                    image: profileImage,
                    username: username,
                    password: encryptedPassword,
                    newPassword: newEncryptedPassword,
                  },
                  {
                    withCredentials: true,
                  }
                );

                if (res.status === 200) {
                  swal({
                    title: "User Information Edit Success!",
                    text: "회원정보 수정이 완료되었습니다.",
                    icon: "success",
                    button: "확인",
                  });

                  dispatch(
                    changeUsername({
                      id,
                      username: inputValues.username,
                      email,
                    })
                  );
                  dispatch(changeProfileImage(profileImage));
                  history.push("/mypage");
                }
              } catch (error) {
                swal({
                  title: "Signup failed!",
                  text: "회원정보 수정이 실패했습니다.",
                  icon: "error",
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
                swal("새 비밀번호 확인칸을 다시 입력해주세요!");
              });
            }
          }
          // 닉네임만 변경
          else if (newPassword === "" && confirmNewPassword === "") {
            try {
              const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
              const encryptedPassword = cryptojs.AES.encrypt(
                JSON.stringify({ password: currentPassword }),
                secretKey
              ).toString();

              const newEncryptedPassword = cryptojs.AES.encrypt(
                JSON.stringify({ password: confirmNewPassword }),
                secretKey
              ).toString();

              const res2 = await axios.patch(
                `${process.env.REACT_APP_END_POINT}/user`,
                {
                  image: profileImage,
                  username: username,
                  password: encryptedPassword,
                  newPassword: newEncryptedPassword,
                },
                {
                  withCredentials: true,
                }
              );

              if (res2.status === 200) {
                swal({
                  title: "User Information Edit Success!",
                  text: "회원정보 수정이 완료되었습니다.",
                  icon: "success",
                  button: "확인",
                });

                dispatch(
                  changeUsername({ id, username: inputValues.username, email })
                );
                dispatch(changeProfileImage(profileImage));
                history.push("/mypage");
              }
            } catch {
              swal({
                title: "Signup failed!",
                text: "회원정보 수정이 실패했습니다.",
                icon: "error",
                button: "확인",
              }).then(() => {
                swal("다시 시도해주세요");
              });
            }
          } else {
            swal({
              title: "Invalid Password!",
              text: "새 비밀번호가 형식에 어긋납니다.",
              icon: "warning",
              button: "확인",
            }).then(() => {
              swal("비밀번호는 6 ~ 10자 영문, 숫자 조합이어야 합니다.");
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
      }
      //  신규 비밀번호만 있을떄
      else if (newPassword !== "") {
        if (validCheckPwValue) {
          if (validCheckDuplicatePwValue) {
            try {
              const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
              const encryptedPassword = cryptojs.AES.encrypt(
                JSON.stringify({ password: currentPassword }),
                secretKey
              ).toString();

              const newEncryptedPassword = cryptojs.AES.encrypt(
                JSON.stringify({ password: confirmNewPassword }),
                secretKey
              ).toString();

              const res3 = await axios.patch(
                `${process.env.REACT_APP_END_POINT}/user`,
                {
                  image: profileImage,
                  username: username,
                  password: encryptedPassword,
                  newPassword: newEncryptedPassword,
                },
                {
                  withCredentials: true,
                }
              );

              if (res3.status === 200) {
                swal({
                  title: "User Information Edit Success!",
                  text: "회원정보 수정이 완료되었습니다.",
                  icon: "success",
                  button: "확인",
                });

                dispatch(
                  changeUsername({ id, username: inputValues.username, email })
                );
                dispatch(changeProfileImage(profileImage));
                history.push("/mypage");
              }
            } catch {
              swal({
                title: "Signup failed!",
                text: "회원정보 수정이 실패했습니다.",
                icon: "error",
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
              swal("새 비밀번호 확인칸을 다시 입력해주세요!");
            });
          }
        } else {
          swal({
            title: "Invalid Password!",
            text: "새 비밀번호가 형식에 어긋납니다.",
            icon: "warning",
            button: "확인",
          }).then(() => {
            swal("비밀번호는 6 ~ 10자 영문, 숫자 조합이어야 합니다.");
          });
        }
      } else {
        swal({
          title: "Insufficient input!",
          text: "변경할 이름 또는 새 비밀번호 둘 중 한 가지는 입력해야 합니다.",
          icon: "warning",
          button: "확인",
        });
      }
    } else {
      swal({
        title: "Insufficient input!",
        text: "현재 비밀번호는 필수 입력사항입니다.",
        icon: "warning",
        button: "확인",
      });
    }
  };

  const handleUserDelete = () => {
    swal({
      title: "정말로 회원 탈퇴 하실 건가요?",
      text: "회원 탈퇴하면 모든 정보가 사라집니다.",
      icon: "warning",
      buttons: ["취소", "탈퇴"],
    }).then(async (ok) => {
      if (ok) {
        try {
          const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;
          const encryptedPassword = cryptojs.AES.encrypt(
            JSON.stringify({ password: inputValues.confirmUserPassword }),
            secretKey
          ).toString();

          const del = await axios.delete(
            `${process.env.REACT_APP_END_POINT}/user`,
            {
              data: {
                password: encryptedPassword,
              },
            },
            {
              withCredentials: true,
            }
          );
          if (del.status === 200) {
            swal({
              title: "Delete Success!",
              text: "성공적으로 회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.",
              icon: "success",
              button: "확인",
            });
          }
          dispatch(deleteUser({}, false));
          dispatch(deleteProfileImage());
          history.push("/");
        } catch (error) {
          swal({
            title: "Error!",
            text: "에상하지 못한 에러가 발생하였습니다.",
            icon: "error",
            button: "확인",
          });
        }
      }
    });
  };

  return (
    <>
      <Container theme={theme}>
        <ProfileArea>
          <Title>회원 정보 수정</Title>
          <ImageWrap>
            <Profile src={profileImage} />
          </ImageWrap>
          <Label>
            <label htmlFor="profileUpload">
              업로드
              <input
                id="profileUpload"
                type="file"
                ref={fileInput}
                name="picture"
                accept="image/*"
                onChange={handleUploadProfile}
                style={{ display: "none" }}
              />
            </label>
          </Label>
        </ProfileArea>

        <EditArea>
          <InputArea className="inputArea">
            <EmailArea>
              <Text>이메일</Text>
              <DefaultValue>{email}</DefaultValue>
            </EmailArea>

            <CurrrentUsernameArea>
              <Text>이름</Text>
              <DefaultValue>{username}</DefaultValue>
            </CurrrentUsernameArea>

            <ChangeUsernameArea>
              <Text>변경할 이름</Text>
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
            </ChangeUsernameArea>
            <CurrentPasswordArea>
              <Text>현재 비밀번호</Text>
              <Input
                type="password"
                name="currentPassword"
                value={inputValues.currentPassword}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="현재 비밀번호를 입력해주세요."
              ></Input>
            </CurrentPasswordArea>
            <NewPasswordArea>
              <Text>새 비밀번호</Text>
              <Input
                type="password"
                name="newPassword"
                value={inputValues.newPassword}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="새 비밀번호를 입력해주세요."
              ></Input>
            </NewPasswordArea>
            <ConfirmNewPasswordArea>
              <Text>새 비밀번호 확인</Text>
              <Input
                type="password"
                name="confirmNewPassword"
                value={inputValues.confirmNewPassword}
                onChange={handleOnChange}
                onKeyPress={pressEnter}
                placeholder="다시 한번 새 비밀번호를 입력해주세요."
              ></Input>
            </ConfirmNewPasswordArea>
          </InputArea>
          <BtnArea className="btnArea">
            <Btn className="cancelBtn" onClick={handleCancel}>
              취소
            </Btn>
            <Btn className="UserEditBtn" onClick={handleUserInfoEdit}>
              수정 완료
            </Btn>
          </BtnArea>
        </EditArea>

        <UserDeleteArea>
          <UserDeleteBtn
            className="UserDeleteBtn"
            onClick={() => setUserCheckPw(!userCheckPw)}
          >
            회원 탈퇴
            <br></br>
            <br></br>
            정말 회원 탈퇴하시겠습니까?
          </UserDeleteBtn>
          {userCheckPw && (
            <UserDeletePassword>
              <Text>비밀번호 입력</Text>
              <Input
                type="password"
                name="confirmUserPassword"
                value={inputValues.confirmUserPassword}
                onChange={handleOnChange}
                placeholder="비밀번호를 입력하세요"
              />
              <DuBtn onClick={handleUserDelete}>회원탈퇴 확인</DuBtn>
            </UserDeletePassword>
          )}
        </UserDeleteArea>
      </Container>
    </>
  );
}
