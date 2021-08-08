import { useSelector } from "react-redux";
import Thumbnail from "./Thumbnail";
import styled from "styled-components";
import theme from "../style/theme";

const RecipeListContainer = styled.div`
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  background-color: red;

  // 반응형 theme.js 활용
  @media ${(props) => props.theme.minimum} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function RecipeList() {
  const state = useSelector((state) => state.articleListReducer);
  return (
    <RecipeListContainer theme={theme}>
      {state.map((article) => {
        return <Thumbnail articleInfo={article} />;
      })}
    </RecipeListContainer>
  );
}

// 게시물 목록 컴포넌트 입니다
// 게시물 목록 리덕스 상태관리
