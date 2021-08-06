import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import RecipeWrite from "./pages/RecipeWrite";
import RecipeView from "./pages/RecipeView";
import RecipeEdit from "./pages/RecipeEdit";
import MyPage from "./pages/MyPage";
import UserEdit from "./pages/UserEdit";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // isLogin Redux 상태관리
  // 현재 로그인한 유저 정보
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/main">
          <Main />
        </Route>

        <Route path="/write">
          <RecipeWrite />
        </Route>

        <Route path="/view">
          <RecipeView />
        </Route>
        {/* ~~~~~/:게시물 id */}

        <Route path="/edit">
          <RecipeEdit />
        </Route>

        <Route path="/mypage">
          <MyPage />
        </Route>

        <Route path="/useredit">
          <UserEdit />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
