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
  const ingredient = JSON.parse(articleInfo.ingredient);
  const color = JSON.parse(articleInfo.thumbnail_color);

  return (
    <ThumbnailContainer>
      <Color layerType={articleInfo.thumbnail_type} color={color} />
      <div className="ingredientList">
        {ingredient.map((el) => {
          return <div>{el[0]}</div>;
        })}
      </div>
    </ThumbnailContainer>
  );
}
// 썸네일 컴포넌트 입니다
