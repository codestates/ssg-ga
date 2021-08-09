import Thumbnail from "./Thumbnail";
import styled from "styled-components";
import theme from "../style/theme";
import { Link } from "react-router-dom";

// 게시글 목록 컨테이너 스타일 컴포넌트
const RecipeListContainer = styled.div`
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  background-color: red;

  height: 100vh;
  overflow-y: scroll;
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

export default function RecipeList({ articleList }) {
  return (
    <RecipeListContainer theme={theme}>
      {articleList.map((article) => {
        return (
          <Link to={"/view/" + article.id}>
            <Thumbnail articleInfo={article} />
          </Link>
        );
      })}
    </RecipeListContainer>
  );
}
// 게시물 목록 컴포넌트 입니다
// 게시물 목록 리덕스 상태관리 >> 재사용 위해 props로 받는 형태로 구현
