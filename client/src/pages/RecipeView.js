import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Color from "../components/Color";

// 게시글 컨테이너 스타일 컴포넌트
const RecipeViewContainer = styled.div``;

export default function RecipeView() {
  const { id } = useParams(); // URL params 가져오는 hooks
  const article = useSelector((state) => state.articleListReducer[id - 1]); // Local test용 redux값 사용
  return (
    <RecipeViewContainer>
      {id}번 게시물 페이지 입니다{article.title}
      <div>
        <div>{article.title}</div>
        <div>
          <div>
            <img src={article.author.image} alt="profile img" />
          </div>
          {article.author.username}
        </div>
      </div>
      <Color thumb={article.thumb} />
      <ul>
        {article.tags.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul>
      <ul>
        {article.ingredient.map((el) => {
          return (
            <li>
              {el.ingredientname}-{el.amount}ml
            </li>
          );
        })}
      </ul>
      <div>{article.content}</div>
      <div>
        count
        <button>Likes</button>
      </div>
    </RecipeViewContainer>
  );
}

// 게시물 보는 페이지 입니다
