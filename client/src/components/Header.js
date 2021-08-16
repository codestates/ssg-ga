import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHome } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import theme from "../style/theme";
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
  justify-content: space-evenly;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  z-index: 3;
  transition-duration: 0.5s;
  &.wheelDown {
    top: -85px;
    opacity: 0;
  }
  margin: 2em 0em 0em 0em;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
const MenuBtn = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 1.2em;
  color: white;
  &:hover {
    color: #e0e0e0;
  }
  &:focus {
    outline: none;
  }
`;

const HeaderMenus = styled.section`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3.5em;
  font-size: 1em;
  margin: 0 0 0 20em;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HamburgerBtn = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 30px;
    right: 20px;
    font-size: 50px;

    color: white;
    &:hover {
      color: #e0e0e0;
    }
    &:focus {
      outline: none;
    }
  }
`;
const MobileMenuBtn = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    font-size: 1.2em;
    color: white;
    &:hover {
      color: #e0e0e0;
    }
    &:focus {
      outline: none;
    }
    font-size: 1.4em;
    margin: 0.5em 0.3em 0 0;
  }
`;
const MoblieHamburgerMenus = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    cursor: pointer;
    display: flex;
    position: absolute;
    place-self: flex-end;
    justify-content: center;
    align-items: center;
    z-index: 999;
    border-radius: 10px;
    background-color: #6d4c41;
    padding: 1.2em;
    margin: 18em 1.5em 2em 2em;
    animation: fadein 2.5s;
    -moz-animation: fadein 2.5s;
    -webkit-animation: fadein 2.5s;
    -o-animation: fadein 2.5s;
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
  }
`;

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.effectReducer);
  const [MobileModalMenu, setMoblieModalMenu] = useState(false);
  const width = useRef(null);

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

  // useEffect(() => {
  //   setMoblieModalMenu(width.current.offsetWidth < 768);
  //   console.log(width.current.offsetWidth);
  //   return () => setMoblieModalMenu(width.current.offsetWidth < 768);
  // });

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

  const handleHamburger = () => {
    setMoblieModalMenu(!MobileModalMenu);
  };

  return (
    <>
      <HeaderContainer
        className={header ? "wheelDown" : "wheelUp"}
        theme={theme}
        ref={width}
      >
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
        <HamburgerBtn onClick={handleHamburger}>
          <HiOutlineMenu />
        </HamburgerBtn>
        <MoblieHamburgerMenus
          style={MobileModalMenu ? { display: "block" } : { display: "none" }}
        >
          <MobileMenuBtn>
            <IoMdHome
              onClick={() => {
                history.push("/main");
              }}
            />
          </MobileMenuBtn>
          {isLogin ? (
            <>
              <MobileMenuBtn
                className="MypagePath"
                onClick={() => {
                  history.push("/mypage");
                }}
              >
                마이페이지
              </MobileMenuBtn>
              <MobileMenuBtn className="logoutPath" onClick={handleLogout}>
                로그아웃
              </MobileMenuBtn>
            </>
          ) : (
            <MobileMenuBtn className="loginPath" onClick={startLogin}>
              로그인
            </MobileMenuBtn>
          )}
        </MoblieHamburgerMenus>
      </HeaderContainer>
    </>
  );
}
// Header 컴포넌트 입니다
