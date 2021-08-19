import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
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
  background-color: #232b6a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px 0 50px;
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
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
  color: #ff71ce;
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
  justify-content: center;
  align-items: center;
  gap: 3.5em;
  font-size: 1em;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HamburgerBtn = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    top: 30px;
    right: 20px;
    font-size: 50px;
    color: #ff71ce;

    &:hover {
      color: white;
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
    color: #ff71ce;

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
  @media screen and (min-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    cursor: pointer;
    display: ${(props) => {
      return props.active ? "flex" : "none";
    }};
    position: absolute;
    flex-direction: column;
    place-self: flex-end;
    z-index: 999;
    border-radius: 5px;
    color: #ff71ce;
    background-color: #212121;
    border: 2px solid #ff71ce;
    font-size: 1.5em;
    width: 11em;
    height: 10em;
    padding: 1.2em;
    margin: 16em 0em 2em 2em;
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

  const handleSize = useCallback((e) => {
    if (width.current.offsetWidth > 768) {
      setMoblieModalMenu(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, [handleSize]);

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
          <img src="../Logo.png" width="120" height="50" />
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
        <MoblieHamburgerMenus active={MobileModalMenu}>
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
