import Thumbnail from "./Thumbnail";
import styled from "styled-components";
import theme from "../style/theme";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestList } from "../utils/requestList";
import { useDispatch, useSelector } from "react-redux";
import {
  setArticleList,
  addArticleList,
  setTagList,
  setPageInit,
} from "../actions";
import axios from "axios";
import LoadingIndicator from "./Loading";

// 게시글 목록 컨테이너 스타일 컴포넌트
const RecipeListContainer = styled.div`
  width: 100%;
  padding: 50px 10px;
  display: grid;
  row-gap: 50px;
  align-content: flex-start;
  flex-wrap: wrap;
  // 반응형 theme.js 활용
  @media ${(props) => props.theme.minimum} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }

  > .emptyList {
    width: 100%;
    grid-column-start: 1;
    grid-column-end: span 4;
    text-align: center;
    @media ${(props) => props.theme.minimum} {
      grid-column-end: span 1;
    }
    @media ${(props) => props.theme.mobile} {
      grid-column-end: span 1;
    }
    @media ${(props) => props.theme.tablet} {
      grid-column-end: span 3;
    }
    @media ${(props) => props.theme.desktop} {
      grid-column-end: span 4;
    }
  }
`;

export default function RecipeList({ query }) {
  const dispatch = useDispatch();
  const { articleList } = useSelector((state) => state.articleListReducer);
  const [count, setCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [addFetching, setAddFetching] = useState(false);

  const handleScroll = () => {
    const fetchData = async () => {
      setAddFetching(true);
      const data = await requestList(count + 12, query);
      if (data.length !== 0) {
        dispatch(addArticleList(data));
        setCount(count + 12);
      } else {
        setIsEnd(true);
      }
      setAddFetching(false);
    };

    if (
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight &&
      !isEnd
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsEnd(false);
      setFetching(true);
      const listData = await requestList(0, query);
      dispatch(setArticleList(listData));
      if (listData.length === 0) setIsEnd(true);
      setFetching(false);
      setCount(0);

      try {
        const res = await axios.get(
          process.env.REACT_APP_END_POINT + "/article/category"
        );
        const { tags, ingredients } = res.data.data;
        dispatch(setTagList({ tags: tags, ingredients: ingredients }));
      } catch (err) {
        console.log("tag를 불러오지 못했습니다");
      }
    };
    fetchData();
    dispatch(setPageInit());
  }, [query]);

  return (
    <RecipeListContainer theme={theme}>
      {fetching ? (
        <LoadingIndicator />
      ) : articleList && articleList.length !== 0 ? (
        articleList.map((el, index) => {
          return (
            <Link key={"thumbnail" + index} to={"/view/" + el.id}>
              <Thumbnail articleInfo={el} />
            </Link>
          );
        })
      ) : null}
      {addFetching ? (
        <LoadingIndicator />
      ) : isEnd ? (
        <div className="emptyList">더 이상 표시할 게시물이 없습니다.</div>
      ) : null}
    </RecipeListContainer>
  );
}