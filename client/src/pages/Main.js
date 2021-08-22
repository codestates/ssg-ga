import { useHistory, useLocation } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import TagRanking from "../components/TagRanking";
import styled from "styled-components";
import theme from "../style/theme";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal, showModal } from "../actions";
import { AiOutlinePlus } from "react-icons/ai";

// 메인 페이지 스타일 컴포넌트
const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  min-height: 770px;
  font-size: 15px;
  > div {
    width: 100%;
  }

  > #tagTitleWrap {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    > h1 {
      position: relative;
      font-size: 2.5em;
      padding: 10px;
      ::after {
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        width: 100%;
        height: 100%;
        border-bottom: 3px solid white;
      }
    }
    > button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      right: 50px;
      border: 3px solid #ff71ce;
      border-radius: 30%;
      > svg {
        font-size: 25px;
        color: #ff71ce;
      }
      :hover {
        > svg {
          color: white;
        }
        border: 3px solid white;
      }
    }
  }

  @media ${(props) => props.theme.minimum} {
    > #tagTitleWrap {
      > h1 {
        font-size: 2em;
      }
      > button {
        right: 20px;
      }
    }
  }
  @media ${(props) => props.theme.mobile} {
    > #tagTitleWrap {
      > h1 {
        font-size: 2em;
      }
      > button {
      }
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
      setTitle("#" + query.tag);
    } else if (query.ingredient) {
      setTitle("#" + query.ingredient);
    } else if (query.username) {
      setTitle("@" + query.username);
    } else {
      setTitle("전체보기");
    }
  }, [query.mostLiked, query.tag, query.ingredient, query.username]);

  return (
    <MainContainer theme={theme}>
      <TagRanking query={query} />
      <div id="tagTitleWrap">
        <h1>{title}</h1>
        <button
          onClick={() => {
            state.isLogin ? history.push("/write") : popModal();
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div id="writeBtnWrap"></div>
      <RecipeList query={query} />
    </MainContainer>
  );
}

// 메인 페이지 입니다
