import { Link, useLocation } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import TagRanking from "../components/TagRanking";
import styled from "styled-components";
import theme from "../style/theme";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { requestList } from "../utils/requestList";
import { setArticleList } from "../actions";

// 메인 페이지 스타일 컴포넌트
const MainContainer = styled.div`
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
  }

  > #tagTitleWrap {
    text-align: center;
  }

  > #writeBtnWrap {
    display: flex;
    justify-content: flex-end;
    > a {
      text-align: center;
      line-height: 50px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: blue;
      color: white;
    }
  }
`;

export default function Main() {
  const { article } = useSelector((state) => state.articleListReducer);
  const { search } = useLocation();
  const [title, setTitle] = useState("전체보기");
  const option = queryString.parse(search);
  const dispatch = useDispatch();
  useEffect(async () => {
    if (option.likes) {
      setTitle("추천순");
    } else if (option.tag) {
      setTitle(option.tag);
    } else if (option.ingredient) {
      setTitle(option.ingredient);
    } else {
      const data = await requestList();
      dispatch(setArticleList(data));
      setTitle("전체보기");
    }
  }, []);

  return (
    <MainContainer theme={theme}>
      <TagRanking option={option} />
      <div id="tagTitleWrap">{title}</div>
      <div id="writeBtnWrap">
        <Link to="/write">등록</Link>
      </div>
      <RecipeList articleList={article} />
    </MainContainer>
  );
}

// 메인 페이지 입니다
