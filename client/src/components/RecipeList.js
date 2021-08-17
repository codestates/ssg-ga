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
  setTopButton,
  setPageInit,
} from "../actions";
import axios from "axios";
import TopButton from "./TopButton";

// 게시글 목록 컨테이너 스타일 컴포넌트
const RecipeListContainer = styled.div`
  width: 100%;
  display: grid;
  row-gap: 50px;
  align-content: flex-start;
  flex-wrap: wrap;
  transition-duration: 0.5s;
  margin: 50px 0;

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
`;

export default function RecipeList({ query }) {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { articleList } = useSelector((state) => state.articleListReducer);
  const { topButton } = useSelector((state) => state.effectReducer);
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isEnd
    ) {
      const data = await requestList(count + 12, query);
      if (data.length !== 0) {
        dispatch(addArticleList(data));
        setCount(count + 12);
      } else {
        setIsEnd(true);
      }
    }

    if (window.scrollY > 300) {
      dispatch(setTopButton(true));
    } else {
      dispatch(setTopButton(false));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(async () => {
    setIsEnd(false);
    const listData = await requestList(0, query);
    dispatch(setArticleList(listData));
    setCount(0);

    try {
      const res = await axios.get(
        process.env.REACT_APP_END_POINT + "/article/category"
      );
      const { tags, ingredients } = res.data.data;
      dispatch(setTagList({ tags: tags, ingredients: ingredients }));
      dispatch(setPageInit());
    } catch (err) {
      console.log("tag를 불러오지 못했습니다");
    }
  }, [query]);

  return (
    <RecipeListContainer theme={theme}>
      {articleList.map((el) => {
        return (
          <Link to={"/view/" + el.id}>
            <Thumbnail articleInfo={el} />
          </Link>
        );
      })}
      <TopButton active={topButton} />
    </RecipeListContainer>
  );
}
// 게시물 목록 컴포넌트 입니다
// 게시물 목록 리덕스 상태관리 >> 재사용 위해 props로 받는 형태로 구현
