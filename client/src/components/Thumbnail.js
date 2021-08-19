import Color from "./Color";
import styled from "styled-components";
import theme from "../style/theme";
import { BsHeartFill } from "react-icons/bs";

// Thumbnail 스타일 컴포넌트
const ThumbnailContainer = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  color: white;
  box-sizing: border-box;
  &:hover {
    border: 3px solid white;
    box-shadow: #dddddd 0 0 15px, inset #dddddd 0 0 15px;
  }

  @media ${(props) => props.theme.minimum} {
    width: 100%;
    border-radius: 0px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    border-radius: 0px;
  }

  > #likeCount {
    position: absolute;
    display: flex;
    height: 25px;
    justify-content: center;
    align-items: center;
    bottom: 0;
    font-size: 18px;
    > svg {
      margin: 0 15px;
      color: red;
    }
    > span {
      line-height: 18px;
    }
  }

  > .ingredientList {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 250px;
    border-radius: 10px;
    position: absolute;

    padding: 10px;
    word-break: keep-all;
    text-align: right;
    > ul {
      margin-right: 10px;
      width: 35%;

      > li {
      }
    }
    > h3 {
      width: 35%;
      margin-right: 10px;
      border-bottom: 3px solid white;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
  }
`;

export default function Thumbnail({ articleInfo }) {
  const { ingredient, thumbnail_type, thumbnail_color } = articleInfo;

  return (
    <ThumbnailContainer theme={theme}>
      <Color
        layerType={thumbnail_type}
        color={thumbnail_color[0]}
        pos={thumbnail_color[1]}
        deco={thumbnail_color[2]}
      />
      <div className="ingredientList">
        <h3>{articleInfo.title}</h3>
        <ul>
          {ingredient.map((el, index) => {
            return index < 3 ? <li>{el[0]}</li> : null;
          })}
        </ul>
      </div>
      <div id="likeCount">
        <BsHeartFill />
        <span>{articleInfo.like_user_id.length}</span>
      </div>
    </ThumbnailContainer>
  );
}
// 썸네일 컴포넌트 입니다
