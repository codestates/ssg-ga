import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid lime;

  width: 11rem;
  height: 11rem;

  border-radius: 50%;
  overflow: hidden;
`;
const Profile = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const EditArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const EmailArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 2em;
`;
const UsernameArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const CurrrentUsernameBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
`;

const ChangeUsernameBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
`;
const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
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
  justify-content: center;
  align-items: center;
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2em;
`;

const CancelBtn = styled.button`
  cursor: pointer;
  display: flex;
`;

const UserEditBtn = styled.button`
  cursor: pointer;
  display: flex;
`;
const UserDeleteArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const UserDeleteBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
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
                icon: "warning",
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
          text: "변경할 이름 또는 새 비밀번호 둘 중 한가지는 입력해야 합니다.",
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

  const handleUserDelete = async () => {
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
          text: "성공적으로 회원탈퇴 되었습니다.",
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
        text: "에상하지 못한 에러가 발생하였습니다. 도망치세요",
        icon: "danger",
        button: "확인",
      });
    }
  };

  // FIXME 회원정보 수정후 리덕스 상태관리 해야함!

  return (
    <>
      <Container>
        <Title>회원 정보 수정</Title>
        <ImageWrap>
          <Profile src={profileImage} />
        </ImageWrap>
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

        <EditArea>
          <InputArea className="inputArea">
            <EmailArea>
              <div>이메일</div>
              <div>{email}</div>
            </EmailArea>
            <UsernameArea>
              <CurrrentUsernameBox>
                <div> 현재 사용 이름</div>
                <div>{username}</div>
              </CurrrentUsernameBox>
              <ChangeUsernameBox>
                <div>변경할 이름</div>
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
              </ChangeUsernameBox>
            </UsernameArea>
            <div>현재 비밀번호</div>
            <Input
              type="password"
              name="currentPassword"
              value={inputValues.currentPassword}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="현재 비밀번호를 입력해주세요."
            ></Input>
            <div>새 비밀번호</div>
            <Input
              type="password"
              name="newPassword"
              value={inputValues.newPassword}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="새 비밀번호를 입력해주세요."
            ></Input>
            <div>비밀번호 확인</div>
            <Input
              type="password"
              name="confirmNewPassword"
              value={inputValues.confirmNewPassword}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              placeholder="다시 한번 새 비밀번호를 입력해주세요."
            ></Input>
          </InputArea>
          <BtnArea className="btnArea">
            <CancelBtn className="cancelBtn" onClick={handleCancel}>
              취소
            </CancelBtn>
            <UserEditBtn className="UserEditBtn" onClick={handleUserInfoEdit}>
              수정 완료
            </UserEditBtn>
          </BtnArea>
        </EditArea>

        <UserDeleteArea>
          <UserDeleteBtn
            className="UserDeleteBtn"
            onClick={() => setUserCheckPw(!userCheckPw)}
          >
            회원 탈퇴
          </UserDeleteBtn>
          {userCheckPw && (
            <div>
              비밀번호 입력
              <input
                type="password"
                name="confirmUserPassword"
                value={inputValues.confirmUserPassword}
                onChange={handleOnChange}
                placeholder="비밀번호를 입력하세요"
              />
              <button onClick={handleUserDelete}>회원탈퇴 확인</button>
            </div>
          )}
        </UserDeleteArea>
      </Container>
    </>
  );
}
