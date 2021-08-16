import logo from "./logo.svg";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import RecipeWrite from "./pages/RecipeWrite";
import RecipeView from "./pages/RecipeView";
import MyPage from "./pages/MyPage";
import UserEdit from "./pages/UserEdit";
import ModalContainer from "./components/ModalContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import theme from "./style/theme";
import { setLogin, setProfileImage } from "./actions/index";
import axios from "axios";

const AppContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    margin-top: 45px;
    //  반응형 theme.js 활용
    @media ${(props) => props.theme.minimum} {
      width: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      width: 480px;
    }
    @media ${(props) => props.theme.tablet} {
      width: 770px;
    }
    @media ${(props) => props.theme.desktop} {
      width: 1200px;
    }
  }
`;

axios.defaults.withCredentials = true;

function App() {
  // isLogin Redux 상태관리
  // 현재 로그인한 유저 정보
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    if (authorizationCode) {
      KakaoLogin(authorizationCode);
      history.push("/");
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_END_POINT}/user/auth`
      );

      console.log(res);

      if (res.status === 200) {
        console.log(res.data.data);

        const { id, username, email, image } = res.data.data;
        dispatch(setLogin({ id, username, email }, true));
        dispatch(setProfileImage(image));
      }
    }
  }, []);

  const KakaoLogin = async (authorizationCode) => {
    await axios
      .post(`${process.env.REACT_APP_END_POINT}/user/oauth`, {
        authorizationCode,
      })
      .then(async () => {
        const res2 = await axios.get(
          `${process.env.REACT_APP_END_POINT}/user/auth`
        );

        if (res2.status === 200) {
          console.log(res2.data.data);

          const { id, username, email, image } = res2.data.data;
          dispatch(setLogin({ id, username, email }, true));
          dispatch(setProfileImage(image));
        }
      });
  };

  const authorizationCode = new URL(window.location.href).searchParams.get(
    "code"
  );

  return (
    <AppContainer theme={theme}>
      <ModalContainer />
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/main:option?">
          <Main />
        </Route>

        <Route path="/write/:id?">
          <RecipeWrite />
        </Route>

        <Route path="/view/:id">
          <RecipeView />
        </Route>

        <Route path="/mypage">
          <MyPage />
        </Route>

        <Route path="/useredit">
          <UserEdit />
        </Route>
      </Switch>
      <Footer />
    </AppContainer>
  );
}

export default App;
