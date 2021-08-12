import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Color from "../components/Color";
import axios from "axios";
import swal from "sweetalert";
import altProfile from "../static/alt-profile.jpg";
import { useDispatch } from "react-redux";
import { setPageInit } from "../actions";

// 게시글 컨테이너 스타일 컴포넌트
const RecipeViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 960px;
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
    margin-right: 10px;
    border-radius: 20px;
    padding: 10px;
    background-color: black;
    > a {
      color: white;
      white-space: nowrap;
    }
  }
`;

const LikesContainer = styled.div`
  align-self: flex-end;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const LikeButton = styled.button`
  border: 3px solid red;
  color: white;
  background-color: red;
  cursor: pointer;
  &.active {
    border: 3px solid green;
    color: white;
    background-color: green;
  }
`;

export default function RecipeView() {
  const [article, setArticle] = useState({
    author_id: "",
    title: "",
    thumbnail_color: [[""], [50]],
    thumbnail_type: "",
    content: "",
    tag: [""],
    ingredient: [["", ""]],
    created_at: "",
    author: {
      image: "",
      username: "",
    },
  });
  const [like, setLike] = useState(false);
  const { id } = useParams(); // URL params 가져오는 hooks
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(setPageInit());
    try {
      const res = await axios.get(
        process.env.REACT_APP_END_POINT + "/article/id/" + id + "?user_id=1"
      );
      const article = res.data.data.singleArticle;
      const like = res.data.data.like.value;
      setArticle(article); // key값 맞춰지면 overriding
      setLike(like);
    } catch (err) {
      swal({
        title: "Error",
        text: "게시글 로드 중 에러가 발생했습니다.",
        icon: "error",
        button: "confirm",
      }).then((res) => {
        if (res) history.goBack();
      });
    }
  }, []);

  const deleteArticle = () => {
    swal({
      title: "정말로 삭제하시겠습니까?",
      text: "한번 삭제되면, 복구할 수 없습니다",
      icon: "warning",
      buttons: ["취소", "삭제"],
    }).then(async (ok) => {
      if (ok) {
        try {
          const res = await axios.delete(
            process.env.REACT_APP_END_POINT + "/article/id/" + id
          );
          if (res.status === 200) {
            swal({
              title: "Success",
              text: "삭제되었습니다.",
              icon: "success",
              button: "confirm",
            }).then((result) => {
              if (result) {
                history.push("/main");
              }
            });
          }
        } catch (err) {
          swal({
            title: "Error",
            text: "게시글 삭제 중 에러가 발생했습니다.",
            icon: "error",
            button: "confirm",
          });
        }
      }
    });
  };

  const handleLikes = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_END_POINT + "/article/likebtn",
        {
          user_id: 1,
          article_id: Number(id),
        }
      );
      if (res.status === 200) {
        setLike(!like);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RecipeViewContainer>
      <h1>{article.title}</h1>
      <ButtonWrap>
        <button>
          <Link to={"/write/" + id}>수정</Link>
        </button>
        <button onClick={deleteArticle}>삭제</button>
      </ButtonWrap>
      <ProfileContainer>
        <div>
          <img
            src={article.author.image ? article.author.image : altProfile}
            alt="profile img"
          />
        </div>
        {article.author.username}
      </ProfileContainer>
      <Color
        layerType={article.thumbnail_type}
        color={article.thumbnail_color[0]}
        pos={article.thumbnail_color[1]}
      />
      <TagsContainer>
        {article.tag !== null
          ? article.tag.map((tag) => {
              return (
                <li>
                  <Link to={"/main?tag=" + tag}>{tag}</Link>
                </li>
              );
            })
          : null}
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
        <LikeButton className={like ? "active" : null} onClick={handleLikes}>
          Likes
        </LikeButton>
        {/* 비로그인시 로그인창 띄우기 */}
        <button id="backBtn" onClick={() => history.push("/main")}>
          목록보기
        </button>
      </LikesContainer>
    </RecipeViewContainer>
  );
}

// 게시물 보는 페이지 입니다
