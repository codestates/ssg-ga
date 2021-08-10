import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../actions";
// import axios from "axios";

export default function Header({}) {
  const [isLogin, setLogin] = useState(false); //NOTE 테스트용
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {};

  const startLogin = () => {
    dispatch(setModal(true));
  };

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
