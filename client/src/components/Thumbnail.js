import Color from "./Color";
import styled from "styled-components";

// Thumbnail 스타일 컴포넌트
const ThumbnailContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  background-color: gray;

  > .ingredientList {
    position: absolute;
    bottom: 0;
  }
`;

export default function Thumbnail({ articleInfo }) {
  const { ingredient } = articleInfo;
  return (
    <ThumbnailContainer>
      <Color thumb={articleInfo.thumb} />
      <div className="ingredientList">
        {ingredient.map((el) => {
          return <div>{el.ingredientname}</div>;
        })}
      </div>
    </ThumbnailContainer>
  );
}
// 썸네일 컴포넌트 입니다
