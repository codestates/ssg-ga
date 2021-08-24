import { useState } from "react";
import { useSelector } from "react-redux";
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
    font-size: 20px;
    @media ${(props) => props.theme.minimum} {
      font-size: 15px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 20px;
    }

    > li {
      border-right: 1px solid white;
      > a,
      span {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        color: white;
        padding: 5px 25px;
        @media ${(props) => props.theme.minimum} {
          padding: 0 15px;
        }
        @media ${(props) => props.theme.mobile} {
          padding: 0 15px;
        }
        &.active {
          ::after {
            content: "";
            width: 70%;
            height: 100%;
            position: absolute;
            border: 2px solid white;
            padding: 0 5px;
            border-radius: 20px;
          }
        }
      }
    }
    > li:last-child {
      border-right: none;
    }
  }

  > div {
    @media ${(props) => props.theme.minimum} {
      width: 375px;
    }
    @media ${(props) => props.theme.mobile} {
      width: 375px;
    }
    > ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 25px 0;
      @media ${(props) => props.theme.minimum} {
        overflow-x: scroll;
        justify-content: space-between;
      }
      @media ${(props) => props.theme.mobile} {
        overflow-x: scroll;
        justify-content: space-between;
      }
      > li {
        margin: 20px 0;
        > a {
          padding: 10px;
          background-color: transparent;
          border-radius: 20px;
          white-space: nowrap;
          border: 2px solid #fdf250;
          color: #fdf250;
          font-weight: bold;
          :hover {
            background-color: #fdf250;
            color: #232b6a;
          }
        }
        @media ${(props) => props.theme.minimum} {
          margin-right: 10px;
          :last-child {
            margin-right: 0;
          }
        }
        @media ${(props) => props.theme.mobile} {
          margin-right: 10px;
          :last-child {
            margin-right: 0;
          }
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
        : query.mostLiked !== undefined
          ? "likes"
          : query.username !== undefined
            ? "published"
            : "all";
  });

  return (
    <TagRankingComponent theme={theme}>
      <ul>
        <li>
          <Link
            className={category === "all" ? "active" : null}
            onClick={() => {
              setCategory("all");
            }}
            to="/main"
          >
            전체보기
          </Link>
        </li>
        <li>
          <Link
            className={category === "likes" ? "active" : null}
            onClick={() => {
              setCategory("likes");
            }}
            to="/main?mostLiked=true"
          >
            추천순
          </Link>
        </li>
        <li>
          <span
            className={category === "tags" ? "active" : null}
            onClick={() => {
              setCategory("tags");
            }}
          >
            해시태그
          </span>
        </li>
        <li>
          <span
            className={category === "ingredients" ? "active" : null}
            onClick={() => {
              setCategory("ingredients");
            }}
          >
            재료
          </span>
        </li>
      </ul>
      <div>
        {category === "tags" ? (
          <ul>
            {tags.map((tag, index) => {
              return (
                <li key={"tagrankingtags" + tag + index}>
                  <Link to={"/main?tag=" + tag}># {tag}</Link>
                </li>
              );
            })}
          </ul>
        ) : category === "ingredients" ? (
          <ul>
            {ingredients.map((el, index) => {
              return (
                <li key={"tagrankingingredients" + el + index}>
                  <Link to={"/main?ingredient=" + el}># {el}</Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </TagRankingComponent>
  );
}