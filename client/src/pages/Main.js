import { useHistory, useLocation } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import TagRanking from "../components/TagRanking";
import styled from "styled-components";
import theme from "../style/theme";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal, showModal } from "../actions";

// 메인 페이지 스타일 컴포넌트
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  > div {
    width: 100%;
  }

  > #tagTitleWrap {
    text-align: center;
    border-bottom: 5px solid white;
    padding: 10px;
  }

  > #writeBtnWrap {
    display: flex;
    justify-content: flex-end;
    /* margin: 20px 50px; */
    margin-right: 40px;
    > div {
      text-align: center;
      line-height: 50px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: blue;
      color: white;
      cursor: pointer;
    }
  }
  > #effectContainer {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
    @keyframes upDown {
      from {
        top: -10%;
      }
      to {
        top: 40%;
      }
    }

    > #waveContainer {
      width: 50px;
      height: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: upDown 3000ms infinite alternate;

      > div {
        bottom: -130%;
        opacity: 0.4;
        position: absolute;
        transform-origin: 50% 48%;
        border-radius: 40%;
      }
      @keyframes waveRotate {
        from {
          transform: rotate(0deg);
        }
        from {
          transform: rotate(360deg);
        }
      }
      > #firstWave {
        width: 100px;
        height: 100px;
        background-color: red;
        animation: waveRotate 3000ms infinite linear;
      }
      > #secondWave {
        width: 97px;
        height: 97px;
        background-color: green;
        animation: waveRotate 5000ms infinite linear;
      }
      > #thirdWave {
        width: 95px;
        height: 95px;
        background-color: blue;
        animation: waveRotate 7000ms infinite linear;
      }
    }
  }

  > #shaker {
    max-width: 64px;
    max-height: 64px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTExLjk5OSA1MTEuOTk5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTEuOTk5IDUxMS45OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDk4Ljc4Nyw1NS41OThsLTQyLjQxMi00Mi40MTJjLTE3LjU4LTE3LjU4LTQ2LjAzNi0xNy41ODMtNjMuNjE5LDBsLTU5LjIyNiw1OC45MDVIMjY3LjM0DQoJCQljLTEyLjAxNiwwLTIzLjMxMyw1LTMxLjgwOSwxMy40OTZjLTI4LjQ1LDI4LjQ4MS0zMi44NjksMzIuNzk1LTM0LjY1MSwzNC43NmMtMC4wMDMsMC4wMDQtMC4wMDcsMC4wMDgtMC4wMSwwLjAxMg0KCQkJYy02LjM4Myw3LjY4OS0xODEuNjExLDIxOC43OTYtMTkwLjMwNywyMjkuMjcyYy0xNC45OTMsMTcuOTkyLTEzLjgxLDQ0LjA0OCwyLjc0OSw2MC42MDhsODguNTA1LDg4LjUwNA0KCQkJYzE2LjQ2OSwxNi40NjcsNDIuNTIsMTcuODI0LDYwLjU5LDIuNzY0YzI4My43OC0yMzUuNzM5LDIxOS40NzQtMTgyLjQ0MiwyMjkuMjI4LTE5MC40MjJjMi4xNjgtMS45Ny0yLjk5NCwzLjA2LDM0Ljc1LTM0LjY0Mw0KCQkJYzguNDk3LTguNDk3LDEzLjYwMi0xOS43OTMsMTMuNjAyLTMxLjgwOXYtNjYuMTkxbDU4LjgtNTkuMjI2QzUxNi4zMjUsMTAxLjY3Nyw1MTYuMzI1LDczLjEzOCw0OTguNzg3LDU1LjU5OHogTTE0My4yMjUsNDc4LjQ1NA0KCQkJYy01Ljk5Niw0Ljk5Ny0xNC42ODIsNC42MDMtMjAuMjAzLTAuOTE3bC04OC41MDUtODguNTA1Yy01LjUyLTUuNTItNS45MTQtMTQuMjA1LTAuODk4LTIwLjIyNWwxMC40Ny0xMi42MTVMMTU1Ljg1Nyw0NjcuOTYNCgkJCUwxNDMuMjI1LDQ3OC40NTR6IE0xNzkuMDI0LDQ0OC43MTVMNjMuMzI2LDMzMy4wMThsMTExLjczNS0xMzQuNjEzTDMxMy41ODcsMzM2LjkzTDE3OS4wMjQsNDQ4LjcxNXogTTMzNi43NTUsMzE3LjY4Ng0KCQkJTDE5NC4yOTgsMTc1LjIzbDE5LjIzNy0yMy4xNzVsMTQ2LjM4NywxNDYuMzg3TDMzNi43NTUsMzE3LjY4NnogTTQwOS45OTgsMjQ0LjYzMWMwLDQuMDA2LTEuOTg1LDcuNzctNC44MTgsMTAuNjAzDQoJCQlsLTIzLjAyNSwyMy4wMjVjLTguMjUxLTguMjUxLTE0MC4xOTEtMTQwLjE5MS0xNDguNDQyLTE0OC40NDJsMjMuMDI0LTIzLjAyNWMyLjgzMi0yLjgzMiw2LjU5OC00LjcxMywxMC42MDMtNC43MTNoNjYuMTkxDQoJCQlsNzYuNDY3LDc2LjM2MVYyNDQuNjMxeiBNNDc3LjU4LDk4LjAwOWwtNTMuMDE1LDUzLjAxNWwtNjMuNjE5LTYzLjYxOWw1My4wMTYtNTMuMDE0YzUuODYxLTUuODYsMTUuMzQ1LTUuODYxLDIxLjIwNiwwDQoJCQlsNDIuNDEyLDQyLjQxMkM0ODMuNDI3LDgyLjY1LDQ4My40MjcsOTIuMTYzLDQ3Ny41OCw5OC4wMDl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNjUuMzQ3LDI1Ljc1MmMtMi42MjEtNy44NTUtMTEuMTEyLTEyLjEtMTguOTctOS40OEM4NC4yODQsMzYuOTg2LDM0Ljg0OSw4Ni40MjMsMTQuMTM2LDE0OC41MTYNCgkJCWMtMi42MjEsNy44NTYsMS42MjMsMTYuMzUsOS40NzksMTguOTdjNy44NjYsMi42MjQsMTYuMzUzLTEuNjM0LDE4Ljk3LTkuNDhjMTcuNzQ0LTUzLjE5MSw2MC4wOTMtOTUuNTQxLDExMy4yODQtMTEzLjI4NA0KCQkJQzE2My43MjQsNDIuMSwxNjcuOTY4LDMzLjYwOCwxNjUuMzQ3LDI1Ljc1MnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTE4NC4zMiw4Mi42NjNjLTIuNjItNy44NTUtMTEuMTA4LTEyLjEwMS0xOC45NjktOS40ODNjLTQ0LjI4OSwxNC43NjMtNzkuNTQ0LDUwLjAxOC05NC4zMDcsOTQuMzA3DQoJCQljLTIuNjE5LDcuODU2LDEuNjI3LDE2LjM0OSw5LjQ4NCwxOC45NjhjNy44NTcsMi42MTksMTYuMzQ5LTEuNjI3LDE4Ljk2OC05LjQ4NGMxMS43OTQtMzUuMzgyLDM5Ljk1OS02My41NDcsNzUuMzQxLTc1LjM0MQ0KCQkJQzE4Mi42OTIsOTkuMDExLDE4Ni45MzgsOTAuNTE5LDE4NC4zMiw4Mi42NjN6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NzYuMjg4LDMzNi42OTFjLTcuODU4LTIuNjIxLTE2LjM0OSwxLjYyMy0xOC45Nyw5LjQ4Yy0xNy43NDQsNTMuMTkxLTYwLjA5Myw5NS41NC0xMTMuMjg1LDExMy4yODMNCgkJCWMtNy44NTUsMi42Mi0xMi4xLDExLjExMy05LjQ3OSwxOC45N2MyLjYxNiw3Ljg0MywxMS4xLDEyLjEwNCwxOC45Nyw5LjQ4YzYyLjA5My0yMC43MTMsMTExLjUzLTcwLjE0OSwxMzIuMjQzLTEzMi4yNDMNCgkJCUM0ODguMzg4LDM0Ny44MDUsNDg0LjE0MywzMzkuMzEzLDQ3Ni4yODgsMzM2LjY5MXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQxOS4zNzUsMzE3LjcyMWMtNy44NTYtMi42MTgtMTYuMzQ5LDEuNjI3LTE4Ljk2OCw5LjQ4NGMtMTEuNzk0LDM1LjM4Mi0zOS45NTksNjMuNTQ3LTc1LjM0MSw3NS4zNDENCgkJCWMtNy44NTYsMi42MTktMTIuMTAyLDExLjExMS05LjQ4NCwxOC45NjhjMi42MTksNy44NTcsMTEuMTEsMTIuMTAyLDE4Ljk2OCw5LjQ4NGM0NC4yODktMTQuNzYzLDc5LjU0NC01MC4wMTgsOTQuMzA3LTk0LjMwOA0KCQkJQzQzMS40NzgsMzI4LjgzMSw0MjcuMjMxLDMyMC4zNCw0MTkuMzc1LDMxNy43MjF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);
    animation: shake 200ms infinite alternate;
    margin-top: 20px;
  }

  @keyframes shake {
    from {
      transform: rotateZ(-55deg);
    }

    to {
      transform: rotateZ(-30deg);
    }
  }
`;

export default function Main() {
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  const [title, setTitle] = useState("전체보기");
  const query = queryString.parse(search);
  const popModal = () => {
    dispatch(setModal(true));
    dispatch(showModal(true));
  };

  useEffect(() => {
    if (query.mostLiked) {
      setTitle("추천순");
    } else if (query.tag) {
      setTitle(query.tag);
    } else if (query.ingredient) {
      setTitle(query.ingredient);
    } else {
      setTitle("전체보기");
    }
  }, [query.mostLiked, query.tag, query.ingredient]);

  return (
    <MainContainer theme={theme}>
      <TagRanking query={query} />
      <h1 id="tagTitleWrap">{title}</h1>
      <div id="writeBtnWrap">
        <div
          onClick={() => {
            state.isLogin ? history.push("/write") : popModal();
          }}
        >
          등록
        </div>
      </div>
      {/* <div id="effectContainer">
        <div id="waveContainer">
          <div id="firstWave"></div>
          <div id="secondWave"></div>
          <div id="thirdWave"></div>
        </div>
      </div>
      <img
        id="shaker"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTExLjk5OSA1MTEuOTk5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTEuOTk5IDUxMS45OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDk4Ljc4Nyw1NS41OThsLTQyLjQxMi00Mi40MTJjLTE3LjU4LTE3LjU4LTQ2LjAzNi0xNy41ODMtNjMuNjE5LDBsLTU5LjIyNiw1OC45MDVIMjY3LjM0DQoJCQljLTEyLjAxNiwwLTIzLjMxMyw1LTMxLjgwOSwxMy40OTZjLTI4LjQ1LDI4LjQ4MS0zMi44NjksMzIuNzk1LTM0LjY1MSwzNC43NmMtMC4wMDMsMC4wMDQtMC4wMDcsMC4wMDgtMC4wMSwwLjAxMg0KCQkJYy02LjM4Myw3LjY4OS0xODEuNjExLDIxOC43OTYtMTkwLjMwNywyMjkuMjcyYy0xNC45OTMsMTcuOTkyLTEzLjgxLDQ0LjA0OCwyLjc0OSw2MC42MDhsODguNTA1LDg4LjUwNA0KCQkJYzE2LjQ2OSwxNi40NjcsNDIuNTIsMTcuODI0LDYwLjU5LDIuNzY0YzI4My43OC0yMzUuNzM5LDIxOS40NzQtMTgyLjQ0MiwyMjkuMjI4LTE5MC40MjJjMi4xNjgtMS45Ny0yLjk5NCwzLjA2LDM0Ljc1LTM0LjY0Mw0KCQkJYzguNDk3LTguNDk3LDEzLjYwMi0xOS43OTMsMTMuNjAyLTMxLjgwOXYtNjYuMTkxbDU4LjgtNTkuMjI2QzUxNi4zMjUsMTAxLjY3Nyw1MTYuMzI1LDczLjEzOCw0OTguNzg3LDU1LjU5OHogTTE0My4yMjUsNDc4LjQ1NA0KCQkJYy01Ljk5Niw0Ljk5Ny0xNC42ODIsNC42MDMtMjAuMjAzLTAuOTE3bC04OC41MDUtODguNTA1Yy01LjUyLTUuNTItNS45MTQtMTQuMjA1LTAuODk4LTIwLjIyNWwxMC40Ny0xMi42MTVMMTU1Ljg1Nyw0NjcuOTYNCgkJCUwxNDMuMjI1LDQ3OC40NTR6IE0xNzkuMDI0LDQ0OC43MTVMNjMuMzI2LDMzMy4wMThsMTExLjczNS0xMzQuNjEzTDMxMy41ODcsMzM2LjkzTDE3OS4wMjQsNDQ4LjcxNXogTTMzNi43NTUsMzE3LjY4Ng0KCQkJTDE5NC4yOTgsMTc1LjIzbDE5LjIzNy0yMy4xNzVsMTQ2LjM4NywxNDYuMzg3TDMzNi43NTUsMzE3LjY4NnogTTQwOS45OTgsMjQ0LjYzMWMwLDQuMDA2LTEuOTg1LDcuNzctNC44MTgsMTAuNjAzDQoJCQlsLTIzLjAyNSwyMy4wMjVjLTguMjUxLTguMjUxLTE0MC4xOTEtMTQwLjE5MS0xNDguNDQyLTE0OC40NDJsMjMuMDI0LTIzLjAyNWMyLjgzMi0yLjgzMiw2LjU5OC00LjcxMywxMC42MDMtNC43MTNoNjYuMTkxDQoJCQlsNzYuNDY3LDc2LjM2MVYyNDQuNjMxeiBNNDc3LjU4LDk4LjAwOWwtNTMuMDE1LDUzLjAxNWwtNjMuNjE5LTYzLjYxOWw1My4wMTYtNTMuMDE0YzUuODYxLTUuODYsMTUuMzQ1LTUuODYxLDIxLjIwNiwwDQoJCQlsNDIuNDEyLDQyLjQxMkM0ODMuNDI3LDgyLjY1LDQ4My40MjcsOTIuMTYzLDQ3Ny41OCw5OC4wMDl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNjUuMzQ3LDI1Ljc1MmMtMi42MjEtNy44NTUtMTEuMTEyLTEyLjEtMTguOTctOS40OEM4NC4yODQsMzYuOTg2LDM0Ljg0OSw4Ni40MjMsMTQuMTM2LDE0OC41MTYNCgkJCWMtMi42MjEsNy44NTYsMS42MjMsMTYuMzUsOS40NzksMTguOTdjNy44NjYsMi42MjQsMTYuMzUzLTEuNjM0LDE4Ljk3LTkuNDhjMTcuNzQ0LTUzLjE5MSw2MC4wOTMtOTUuNTQxLDExMy4yODQtMTEzLjI4NA0KCQkJQzE2My43MjQsNDIuMSwxNjcuOTY4LDMzLjYwOCwxNjUuMzQ3LDI1Ljc1MnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTE4NC4zMiw4Mi42NjNjLTIuNjItNy44NTUtMTEuMTA4LTEyLjEwMS0xOC45NjktOS40ODNjLTQ0LjI4OSwxNC43NjMtNzkuNTQ0LDUwLjAxOC05NC4zMDcsOTQuMzA3DQoJCQljLTIuNjE5LDcuODU2LDEuNjI3LDE2LjM0OSw5LjQ4NCwxOC45NjhjNy44NTcsMi42MTksMTYuMzQ5LTEuNjI3LDE4Ljk2OC05LjQ4NGMxMS43OTQtMzUuMzgyLDM5Ljk1OS02My41NDcsNzUuMzQxLTc1LjM0MQ0KCQkJQzE4Mi42OTIsOTkuMDExLDE4Ni45MzgsOTAuNTE5LDE4NC4zMiw4Mi42NjN6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NzYuMjg4LDMzNi42OTFjLTcuODU4LTIuNjIxLTE2LjM0OSwxLjYyMy0xOC45Nyw5LjQ4Yy0xNy43NDQsNTMuMTkxLTYwLjA5Myw5NS41NC0xMTMuMjg1LDExMy4yODMNCgkJCWMtNy44NTUsMi42Mi0xMi4xLDExLjExMy05LjQ3OSwxOC45N2MyLjYxNiw3Ljg0MywxMS4xLDEyLjEwNCwxOC45Nyw5LjQ4YzYyLjA5My0yMC43MTMsMTExLjUzLTcwLjE0OSwxMzIuMjQzLTEzMi4yNDMNCgkJCUM0ODguMzg4LDM0Ny44MDUsNDg0LjE0MywzMzkuMzEzLDQ3Ni4yODgsMzM2LjY5MXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQxOS4zNzUsMzE3LjcyMWMtNy44NTYtMi42MTgtMTYuMzQ5LDEuNjI3LTE4Ljk2OCw5LjQ4NGMtMTEuNzk0LDM1LjM4Mi0zOS45NTksNjMuNTQ3LTc1LjM0MSw3NS4zNDENCgkJCWMtNy44NTYsMi42MTktMTIuMTAyLDExLjExMS05LjQ4NCwxOC45NjhjMi42MTksNy44NTcsMTEuMTEsMTIuMTAyLDE4Ljk2OCw5LjQ4NGM0NC4yODktMTQuNzYzLDc5LjU0NC01MC4wMTgsOTQuMzA3LTk0LjMwOA0KCQkJQzQzMS40NzgsMzI4LjgzMSw0MjcuMjMxLDMyMC4zNCw0MTkuMzc1LDMxNy43MjF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
      /> */}
      <RecipeList query={query} />
    </MainContainer>
  );
}

// 메인 페이지 입니다
