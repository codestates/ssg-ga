import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Color from "../components/Color";
import axios from "axios";

// 게시글 컨테이너 스타일 컴포넌트
const RecipeViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > #backBtn {
    align-self: flex-start;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  > div {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    > img {
      width: 100%;
    }
  }
`;

const TagsContainer = styled.ul`
  display: flex;
  > li {
    > a {
      margin-right: 10px;
      border-radius: 10px;
      background-color: black;
      color: white;
    }
  }
`;

const LikesContainer = styled.div`
  align-self: flex-end;
`;

export default function RecipeView() {
  const [article, setArticle] = useState({
    title: "",
    author: {
      image: "",
      username: "",
    },
    thumbnail_color: [""],
    thumbnail_type: "",
    content: "",
    tag: [""],
    ingredient: [["", ""]],
  });

  const { id } = useParams(); // URL params 가져오는 hooks
  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_END_POINT + "/article/id/" + id
      );
      setArticle({ ...article, ...res.data.data }); // key값 맞춰지면 overriding
    } catch {}
  }, []);

  return (
    <RecipeViewContainer>
      <div>{article.title}</div>
      <button id="backBtn" onClick={() => history.goBack()}>
        목록보기
      </button>
      <ProfileContainer>
        <div>
          <img src={article.author.image} alt="profile img" />
        </div>
        {article.author.username}
      </ProfileContainer>
      <Color
        layerType={article.thumbnail_type}
        color={article.thumbnail_color}
      />
      <TagsContainer>
        {article.tag.map((tag) => {
          return (
            <li>
              <Link to={"/main?tag=" + tag}>{tag}</Link>
            </li>
          );
        })}
      </TagsContainer>
      <ul>
        {article.ingredient.map((el) => {
          return (
            <li>
              {el[0]}-{el[1]}ml
            </li>
          );
        })}
      </ul>
      <div>{article.content}</div>
      <LikesContainer>
        count
        <button>Likes</button>
      </LikesContainer>
    </RecipeViewContainer>
  );
}

// 게시물 보는 페이지 입니다
