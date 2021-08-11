import Thumbnail from "./Thumbnail";
import styled from "styled-components";
import theme from "../style/theme";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestList } from "../utils/requestList";
import { useDispatch, useSelector } from "react-redux";
import { setArticleList, addArticleList, setTagList } from "../actions";
import axios from "axios";

// 게시글 목록 컨테이너 스타일 컴포넌트
const RecipeListContainer = styled.div`
  width: 100%;
  min-height: 960px;
  display: grid;
  flex-wrap: wrap;
  background-color: red;
  transition-duration: 0.5s;

  // 반응형 theme.js 활용
  @media ${(props) => props.theme.minimum} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function RecipeList({ query }) {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { articleList } = useSelector((state) => state.articleListReducer);
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !isEnd) {
      const data = await requestList(count, query);
      if (data.length !== 0) {
        setCount(count + 6);
        dispatch(addArticleList(data));
      } else {
        setIsEnd(true);
      }
    }
    console.log(count, isEnd);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(async () => {
    setCount(0);
    setIsEnd(false);
    const listData = await requestList(count, query);
    if (listData.length !== 0) {
      setCount(count + 6);
    }
    dispatch(setArticleList(listData));

    try {
      const res = await axios.get(
        process.env.REACT_APP_END_POINT + "/article/category"
      );
      const { tags, ingredients } = res.data.data;
      dispatch(setTagList({ tags: tags, ingredients: ingredients }));
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
    </RecipeListContainer>
  );
}
// 게시물 목록 컴포넌트 입니다
// 게시물 목록 리덕스 상태관리 >> 재사용 위해 props로 받는 형태로 구현
