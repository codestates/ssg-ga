import Color from "./Color";
import styled from "styled-components";

// Thumbnail 스타일 컴포넌트
const ThumbnailContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  > .ingredientList {
    background-color: rgba(255, 255, 255, 0.7);
    border: 3px solid white;
    border-radius: 10px;
    position: absolute;
    bottom: 15%;
    right: 15%;
    padding: 10px;
    > div {
      text-align: center;
    }
  }
`;

export default function Thumbnail({ articleInfo }) {
  const { ingredient, thumbnail_type, thumbnail_color } = articleInfo;

  return (
    <ThumbnailContainer>
      <Color
        layerType={thumbnail_type}
        color={thumbnail_color[0]}
        pos={thumbnail_color[1]}
      />
      <div className="ingredientList">
        {ingredient.map((el) => {
          return <div>{el[0]}</div>;
        })}
      </div>
    </ThumbnailContainer>
  );
}
// 썸네일 컴포넌트 입니다
