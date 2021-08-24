import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHome } from "react-icons/io";
import theme from "../style/theme";
import Search from "./Search";
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
  -webkit-transform-style: preserve-3d;
  -webkit-transform: translateZ(15px);
  transition-duration: 0.5s;
  &.wheelDown {
    top: -85px;
    opacity: 0;
  }
  @media ${(props) => props.theme.minimum} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  @media ${(props) => props.theme.minimum} {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
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
  > svg {
    font-size: 1.5em;
  }
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
  @media ${(props) => props.theme.minimum} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
  @media ${(props) => props.theme.tablet} {
    gap: 2em;
  }
`;

const HamburgerBtn = styled.span`
  display: none;

  @media ${(props) => props.theme.minimum} {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    top: 27px;
    right: 3px;
    font-size: 50px;

    .menu-trigger {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .menu-trigger,
    .menu-trigger span {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
    }

    .menu-trigger {
      position: relative;
      width: 30px;
      height: 30px;
    }

    .menu-trigger span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ff71ce;
      border-radius: 4px;
    }

    .menu-trigger span:nth-of-type(1) {
      top: 0;
    }

    .menu-trigger span:nth-of-type(2) {
      top: 13px;
    }

    .menu-trigger span:nth-of-type(3) {
      bottom: 0;
    }
    .menu-trigger.active span:nth-of-type(1) {
      -webkit-transform: translateY (20px) rotate (-45deg);
      transform: translateY(13px) rotate(-45deg);
    }

    .menu-trigger.active span:nth-of-type(2) {
      opacity: 0;
    }

    .menu-trigger.active span:nth-of-type(3) {
      -webkit-transform: translateY(-20px) rotate(45deg);
      transform: translateY(-13px) rotate(45deg);
    }
  }
  @media ${(props) => props.theme.mobile} {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    top: 27px;
    right: 3px;
    font-size: 50px;

    .menu-trigger {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .menu-trigger,
    .menu-trigger span {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
    }

    .menu-trigger {
      position: relative;
      width: 30px;
      height: 30px;
    }

    .menu-trigger span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ff71ce;
      border-radius: 4px;
    }

    .menu-trigger span:nth-of-type(1) {
      top: 0;
    }

    .menu-trigger span:nth-of-type(2) {
      top: 13px;
    }

    .menu-trigger span:nth-of-type(3) {
      bottom: 0;
    }
    .menu-trigger.active span:nth-of-type(1) {
      -webkit-transform: translateY (20px) rotate (-45deg);
      transform: translateY(13px) rotate(-45deg);
    }

    .menu-trigger.active span:nth-of-type(2) {
      opacity: 0;
    }

    .menu-trigger.active span:nth-of-type(3) {
      -webkit-transform: translateY(-20px) rotate(45deg);
      transform: translateY(-13px) rotate(45deg);
    }
  }
`;

const MobileMenuBtn = styled.span`
  display: none;
  > svg {
    font-size: 1.5em;
  }
  @media ${(props) => props.theme.minimum} {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff71ce;
    &:hover {
      color: #e0e0e0;
    }
    &:focus {
      outline: none;
    }
    font-size: 1em;
  }
  @media ${(props) => props.theme.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff71ce;

    &:hover {
      color: #e0e0e0;
    }
    &:focus {
      outline: none;
    }
    font-size: 1em;
  }
`;
const MoblieHamburgerMenus = styled.div`
  @media ${(props) => props.theme.minimum} {
    cursor: pointer;
    display: ${(props) => {
    return props.active ? "flex" : "none";
  }};
    position: relative;
    flex-direction: column;
    justify-content: space-evenly;
    z-index: 999;
    border-radius: 5px;
    color: #ff71ce;
    background-color: #232b6a;
    border: 2px solid #ff71ce;
    font-size: 1.3em;
    width: 100%;
    height: 8em;
    padding: 1.2em;
    margin: 85px 0em 25em 0em;
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s;
    -webkit-animation: fadein 1.5s;
    -o-animation: fadein 1.5s;
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
  @media ${(props) => props.theme.mobile} {
    cursor: pointer;
    display: ${(props) => {
    return props.active ? "flex" : "none";
  }};
    position: relative;
    flex-direction: column;
    justify-content: space-evenly;
    z-index: 999;
    border-radius: 5px;
    color: #ff71ce;
    background-color: #232b6a;
    border: 2px solid #ff71ce;
    font-size: 1.3em;
    width: 100%;
    height: 12em;
    padding: 1.2em;
    margin: 85px 0em 25em 0em;
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s;
    -webkit-animation: fadein 1.5s;
    -o-animation: fadein 1.5s;
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
  @media ${(props) => props.theme.tablet} {
    display: none;
  }
  @media ${(props) => props.theme.desktop} {
    display: none;
  }
`;
const MobileMenusBackground = styled.div`
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.effectReducer);
  const [MobileModalMenu, setMoblieModalMenu] = useState(false);
  const [active, setActive] = useState("menu-trigger");
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
    if (MobileModalMenu) {
      setActive("menu-trigger");
    } else {
      setActive("menu-trigger active");
    }
  };

  return (
    <>
      <HeaderContainer
        className={header ? "wheelDown" : "wheelUp"}
        theme={theme}
        ref={width}
      >
        <Logo
          theme={theme}
          onClick={() => {
            history.push("/");
          }}
        >
          <img src="../Logo.png" width="120" height="50" alt="ssg-ga-logo" />
        </Logo>
        <HeaderMenus theme={theme}>
          <MenuBtn>
            <Search />
          </MenuBtn>
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
        <HamburgerBtn theme={theme} onClick={handleHamburger}>
          <div className={active}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </HamburgerBtn>
        {MobileModalMenu ? (
          <MobileMenusBackground onClick={handleHamburger}>
            <MoblieHamburgerMenus theme={theme} active={MobileModalMenu}>
              <MobileMenuBtn
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Search handleHamburger={handleHamburger} />
              </MobileMenuBtn>

              <MobileMenuBtn theme={theme}>
                <IoMdHome
                  onClick={() => {
                    history.push("/main");
                  }}
                />
              </MobileMenuBtn>
              {isLogin ? (
                <>
                  <MobileMenuBtn
                    theme={theme}
                    className="MypagePath"
                    onClick={() => {
                      history.push("/mypage");
                    }}
                  >
                    마이페이지
                  </MobileMenuBtn>
                  <MobileMenuBtn
                    theme={theme}
                    className="logoutPath"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </MobileMenuBtn>
                </>
              ) : (
                <MobileMenuBtn
                  theme={theme}
                  className="loginPath"
                  onClick={startLogin}
                >
                  로그인
                </MobileMenuBtn>
              )}
            </MoblieHamburgerMenus>
          </MobileMenusBackground>
        ) : null}
      </HeaderContainer>
    </>
  );
}