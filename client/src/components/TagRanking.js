import { useSelector } from "react-redux";
import styled from "styled-components";

// 상위 Tag 목록 스타일 컴포넌트
const TagRankingComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  > ul {
    display: flex;
    overflow-x: scroll;
    > li {
      background-color: black;
      color: white;
      border-radius: 10px;
      margin-right: 20px;
      white-space: nowrap;
    }
  }
`;

export default function TagRanking() {
  const tagList = useSelector((state) => state.tagRankingReducer);

  return (
    <TagRankingComponent>
      <ul>
        <li>전체보기</li>
        <li>추천순</li>
        {tagList.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul>
    </TagRankingComponent>
  );
}
// 상위 Tag 컴포넌트
