import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Color from "../components/Color";
import axios from "axios";
import swal from "sweetalert";

// 게시글 컨테이너 스타일 컴포넌트
const RecipeViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
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
  }, [article, history, id]);

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

  return (
    <RecipeViewContainer>
      <div>{article.title}</div>
      <ButtonWrap>
        <button id="backBtn" onClick={() => history.goBack()}>
          목록보기
        </button>
        <button>
          <Link to={"/write/" + id}>수정</Link>
        </button>
        <button onClick={deleteArticle}>삭제</button>
      </ButtonWrap>
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
        <button>Likes</button>
      </LikesContainer>
    </RecipeViewContainer>
  );
}

// 게시물 보는 페이지 입니다
