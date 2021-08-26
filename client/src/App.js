import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";
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
import TopButton from "./components/TopButton";

const AppContainer = styled.div`
  > section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      margin-top: 100px;
      //  반응형 theme.js 활용
      @media ${(props) => props.theme.minimum} {
        width: 100%;
      }
      @media ${(props) => props.theme.mobile} {
        width: 375px;
      }
      @media ${(props) => props.theme.tablet} {
        width: 770px;
      }
      @media ${(props) => props.theme.desktop} {
        width: 1200px;
      }
    }
  }
`;

axios.defaults.withCredentials = true;

function App() {
  // isLogin Redux 상태관리
  // 현재 로그인한 유저 정보
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.userReducer);
  const { isLogin } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (authorizationCode) {
        KakaoLogin(authorizationCode, keepLogin);
        history.push("/");
      } else {
        const res = await axios.get(
          `${process.env.REACT_APP_END_POINT}/user/auth`
        );

        if (res.status === 200) {
          const { id, username, email, image } = res.data.data;
          dispatch(setLogin({ id, username, email }, true));
          dispatch(setProfileImage(image));
        }
      }
    };
    fetchData();
  }, []);

  const KakaoLogin = async (authorizationCode) => {
    await axios
      .post(`${process.env.REACT_APP_END_POINT}/user/oauth`, {
        authorizationCode,
        keepLogin,
      })
      .then(async () => {
        const res2 = await axios.get(
          `${process.env.REACT_APP_END_POINT}/user/auth`
        );

        if (res2.status === 200) {
          const { id, username, email, image } = res2.data.data;
          dispatch(setLogin({ id, username, email }, true));
          dispatch(setProfileImage(image));
        }
      });
  };

  const authorizationCode = new URL(window.location.href).searchParams.get(
    "code"
  );
  const keepLogin = new URL(window.location.href).searchParams.get("state");

  return (
    <AppContainer theme={theme}>
      <Header />
      <ModalContainer />
      <Switch>
        <>
          <section>
            <Route exact path="/">
              <Landing />
            </Route>

            <Route exact path="/main:option?">
              <Main />
            </Route>

            <Route exact path="/write/:id?">
              <RecipeWrite />
            </Route>

            <Route exact path="/view/:id">
              <RecipeView />
            </Route>

            <Route exact path="/mypage">
              {isLogin ? (
                <MyPage />
              ) : (
                <>
                  <Redirect to="/" />
                </>
              )}
            </Route>

            <Route exact path="/useredit">
              {isLogin ? <UserEdit /> : <Redirect to="/" />}
            </Route>
            <TopButton />
          </section>
        </>
      </Switch>
      <Footer />
    </AppContainer>
  );
}

export default App;
