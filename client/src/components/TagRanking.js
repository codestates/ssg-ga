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
    font-size: 20px;
    @media ${(props) => props.theme.minimum} {
      font-size: 15px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 20px;
    }

    > li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 25px;
      @media ${(props) => props.theme.minimum} {
        padding: 0 15px;
      }
      @media ${(props) => props.theme.mobile} {
        padding: 0 15px;
      }
      border-right: 1px solid white;
      cursor: pointer;
      &.active {
        ::after {
          content: "";
          width: 70%;
          height: 100%;
          position: absolute;
          border: 2px solid white;
          padding: 0 5px;
          border-radius: 10px;
        }
      }
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
      width: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      width: 375px;
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
        background-color: transparent;
        border: 2px solid #fdf250;
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;
        :hover {
          background-color: #fdf250;
          > a {
            color: #232b6a;
          }
        }
        > a {
          white-space: nowrap;
          color: #fdf250;
          font-weight: bold;
        }
        @media ${(props) => props.theme.minimum} {
          margin-right: 10px;
        }
        @media ${(props) => props.theme.mobile} {
          margin-right: 10px;
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
          className={category === "all" ? "active" : null}
          onClick={() => {
            setCategory("all");
          }}
        >
          <Link to="/main">전체보기</Link>
        </li>
        <li
          className={category === "likes" ? "active" : null}
          onClick={() => {
            setCategory("likes");
          }}
        >
          <Link to="/main?mostLiked=true">추천순</Link>
        </li>
        <li
          className={category === "tags" ? "active" : null}
          onClick={() => {
            setCategory("tags");
          }}
        >
          <a href="#">해시태그</a>
        </li>
        <li
          className={category === "ingredients" ? "active" : null}
          onClick={() => {
            setCategory("ingredients");
          }}
        >
          <a href="#">재료</a>
        </li>
      </ul>
      <div>
        {category === "tags" ? (
          <ul>
            {tags.map((tag) => {
              return (
                <li>
                  <Link to={"/main?tag=" + tag}># {tag}</Link>
                </li>
              );
            })}
          </ul>
        ) : category === "ingredients" ? (
          <ul>
            {ingredients.map((el) => {
              return (
                <li>
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
// 상위 Tag 컴포넌트
