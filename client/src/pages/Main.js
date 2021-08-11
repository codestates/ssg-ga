import { Link, useLocation } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import TagRanking from "../components/TagRanking";
import styled from "styled-components";
import theme from "../style/theme";
import queryString from "query-string";
import { useEffect, useState } from "react";

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
  const { search } = useLocation();
  const [title, setTitle] = useState("전체보기");
  const query = queryString.parse(search);

  useEffect(() => {
    if (query.likes) {
      setTitle("추천순");
    } else if (query.tag) {
      setTitle(query.tag);
    } else if (query.ingredient) {
      setTitle(query.ingredient);
    } else {
      setTitle("전체보기");
    }
  }, [query.likes, query.tag, query.ingredient]);

  return (
    <MainContainer theme={theme}>
      <TagRanking query={query} />
      <div id="tagTitleWrap">{title}</div>
      <div id="writeBtnWrap">
        <Link to="/write">등록</Link>
      </div>
      {/* 비로그인시 로그인창 띄우기 */}
      <RecipeList query={query} />
    </MainContainer>
  );
}

// 메인 페이지 입니다
