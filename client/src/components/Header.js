import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModal, showModal, setLogout, deleteProfileImage } from "../actions";
import axios from "axios";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_END_POINT}/user/signout`,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      dispatch(setLogout());
      dispatch(deleteProfileImage());
      history.push("/");
    }
  };

  const startLogin = () => {
    dispatch(setModal(true));
    dispatch(showModal(true));
  };
  const state = useSelector((state) => state.userReducer);
  const { isLogin } = state;

  return (
    <header id="header">
      <div>SSG_GA</div>
      {isLogin ? (
        <>
          <span
            className="MypagePath"
            onClick={() => {
              history.push("/mypage");
            }}
          >
            마이페이지
          </span>
          <span className="logoutPath" onClick={handleLogout}>
            로그아웃
          </span>
        </>
      ) : (
        <span className="loginPath" onClick={startLogin}>
          로그인
        </span>
      )}
    </header>
  );
}

// Header 컴포넌트 입니다
