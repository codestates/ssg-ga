import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHome } from "react-icons/io";
import {
  setModal,
  showModal,
  setLogout,
  deleteProfileImage,
  setHeaderActive,
} from "../actions";
import axios from "axios";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 125px;
  z-index: 1;
  /* background-color: aqua; */
  transition-duration: 0.5s;
  &.wheelDown {
    top: -85px;
    opacity: 0;
  }
  padding: 1.5em 2em;
`;
const Logo = styled.div`
  cursor: pointer;
`;

const MenuBtn = styled.span`
  &:hover {
    color: #f57f17;
  }
  &:focus {
    outline: none;
  }
`;
const HeaderMenus = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  cursor: pointer;
  font-size: 1em;
  /* font-weight: bold; */
`;

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.effectReducer);

  const handleWheel = (event) => {
    if (event.deltaY >= 0) {
      dispatch(setHeaderActive(true));
    } else {
      dispatch(setHeaderActive(false));
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  });

  const handleLogout = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_END_POINT}/user/signout`,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      history.push("/");
      dispatch(setLogout());
      dispatch(deleteProfileImage());
    }
  };

  const startLogin = () => {
    dispatch(setModal(true));
    dispatch(showModal(true));
  };
  const state = useSelector((state) => state.userReducer);
  const { isLogin } = state;

  return (
    <HeaderContainer className={header ? "wheelDown" : "wheelUp"}>
      <Logo
        onClick={() => {
          history.push("/");
        }}
      >
        <img src="Logo.png" width="120" height="100" />
      </Logo>
      <HeaderMenus>
        <MenuBtn>
          <IoMdHome
            onClick={() => {
              history.push("/main");
            }}
          />
        </MenuBtn>
        {isLogin ? (
          <>
            <MenuBtn
              className="MypagePath"
              onClick={() => {
                history.push("/mypage");
              }}
            >
              마이페이지
            </MenuBtn>
            <MenuBtn className="logoutPath" onClick={handleLogout}>
              로그아웃
            </MenuBtn>
          </>
        ) : (
          <MenuBtn className="loginPath" onClick={startLogin}>
            로그인
          </MenuBtn>
        )}
      </HeaderMenus>
    </HeaderContainer>
  );
}

// Header 컴포넌트 입니다
