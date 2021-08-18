import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../style/theme";

// 상위 Tag 목록 스타일 컴포넌트
const TagRankingComponent = styled.div`
  margin: 25px 0;
  display: grid;
  flex-direction: column;
  justify-content: center;
  color: white;
  > ul {
    display: flex;
    justify-content: center;
    > li {
      padding: 0 20px;
      border-right: 1px solid white;
      cursor: pointer;
      > a {
        color: white;
      }
    }
    > li:last-child {
      border-right: none;
    }
  }

  > div {
    @media ${(props) => props.theme.minimum} {
      width: 350px;
    }
    @media ${(props) => props.theme.mobile} {
      width: 480px;
    }
    > ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 20px 0;
      @media ${(props) => props.theme.minimum} {
        overflow-x: scroll;
        justify-content: space-between;
      }
      @media ${(props) => props.theme.mobile} {
        overflow-x: scroll;
        justify-content: space-between;
      }
      > li {
        background-color: black;
        padding: 10px;
        margin-right: 20px;
        border-radius: 20px;
        cursor: pointer;
        > a {
          white-space: nowrap;
          color: white;
        }
      }
    }
  }
`;

export default function TagRanking({ query }) {
  const { tags, ingredients } = useSelector(
    (state) => state.articleListReducer
  );
  const [category, setCategory] = useState(() => {
    return query.tag !== undefined
      ? "tags"
      : query.ingredient !== undefined
      ? "ingredients"
      : "all";
  });

  return (
    <TagRankingComponent theme={theme}>
      <ul>
        <li
          onClick={() => {
            setCategory("all");
          }}
        >
          <Link to="/main">전체보기</Link>
        </li>
        <li
          onClick={() => {
            setCategory("likes");
          }}
        >
          <Link to="/main?mostLiked=true">추천순</Link>
        </li>
        <li
          onClick={() => {
            setCategory("tags");
          }}
        >
          해시태그
        </li>
        <li
          onClick={() => {
            setCategory("ingredients");
          }}
        >
          재료
        </li>
      </ul>
      <div>
        {category === "tags" ? (
          <ul>
            {tags.map((tag) => {
              return (
                <li>
                  <Link to={"/main?tag=" + tag}>{tag}</Link>
                </li>
              );
            })}
          </ul>
        ) : category === "ingredients" ? (
          <ul>
            {ingredients.map((el) => {
              return (
                <li>
                  <Link to={"/main?ingredient=" + el}>{el}</Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </TagRankingComponent>
  );
}
// 상위 Tag 컴포넌트
