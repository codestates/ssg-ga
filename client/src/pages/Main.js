import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import TagRanking from "../components/TagRanking";
import styled from "styled-components";
import theme from "../style/theme";

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
    > div {
      text-align: center;
      line-height: 50px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: blue;
      > a {
        color: white;
      }
    }
  }
`;

export default function Main() {
  return (
    <MainContainer theme={theme}>
      <TagRanking />
      <div id="tagTitleWrap">전체보기</div>
      <div id="writeBtnWrap">
        <div>
          <Link to="/write">등록</Link>
        </div>
      </div>
      <RecipeList />
    </MainContainer>
  );
}

// 메인 페이지 입니다
