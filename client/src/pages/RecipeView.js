import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Color from "../components/Color";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setPageInit, showModal } from "../actions";
import { BsHeartFill, BsHeart } from "react-icons/bs";

// 게시글 컨테이너 스타일 컴포넌트
const RecipeViewContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 960px;
  color: white;

  > #ingredientList {
    > li {
      > a {
        color: white;
      }
    }
  }

  > #articleContent {
    margin-top: 20px;
    white-space: pre;
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
    margin-right: 20px;
    > img {
      width: 100%;
    }
  }
`;

const TagsContainer = styled.ul`
  display: flex;
  margin: 20px 0;
  > li {
    margin-right: 10px;
    border-radius: 10px;
    padding: 10px;
    background-color: transparent;
    border: 2px solid #ff71ce;
    &:hover {
      box-shadow: 0 0 5px 5px #ff71ce;
      font-weight: bold;
    }
    > a {
      color: #ff71ce;
      white-space: nowrap;
    }
  }
`;

const LikesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 100px;
  > #backBtn {
    margin-left: 50px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const LikeButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  color: red;
  cursor: pointer;
  margin: 0 15px;
  font-size: 25px;
  width: 25px;
  height: 25px;
  > svg {
    position: absolute;
  }
  > .heartFill {
    transition-duration: 0.3s;
    transform: scale(0);
  }
  &:hover {
    box-shadow: none;
  }
  &.active {
    > .heartFill {
      transform: scale(1);
    }
  }
`;

export default function RecipeView() {
  const [article, setArticle] = useState({
    author_id: "",
    title: "",
    thumbnail_color: [[""], [50], [{}, {}]],
    thumbnail_type: "",
    content: "",
    tag: [""],
    ingredient: [["", ""]],
    created_at: "",
    like_user_id: [""],
    author: {
      image: "",
      username: "",
    },
  });
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { id } = useParams(); // URL params 가져오는 hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);

  useEffect(async () => {
    dispatch(setPageInit());
    try {
      const res = await axios.get(
        process.env.REACT_APP_END_POINT +
          "/article/id/" +
          id +
          `?user_id=${state.userData.id}`
      );

      const article = res.data.data.singleArticle;
      const like = res.data.data.like.value;

      setArticle(article);
      setLike(like);
      setLikeCount(JSON.parse(article.like_user_id).length);
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
  }, [state]);

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
    if (state.isLogin) {
      try {
        const res = await axios.post(
          process.env.REACT_APP_END_POINT + "/article/likebtn",
          {
            user_id: state.userData.id,
            article_id: Number(id),
          }
        );
        if (res.status === 200) {
          setLikeCount(res.data.data.likeInfo.length);
          setLike(!like);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(setModal(true));
      dispatch(showModal(true));
    }
  };

  return (
    <RecipeViewContainer>
      <h1>{article.title}</h1>
      {article.author_id === state.userData.id ? (
        <ButtonWrap>
          <button>
            <Link to={"/write/" + id}>수정</Link>
          </button>
          <button onClick={deleteArticle}>삭제</button>
        </ButtonWrap>
      ) : null}
      <ProfileContainer>
        <div>
          <img
            src={
              article.author.image ? article.author.image : "../alt-profile.jpg"
            }
            alt="profile img"
          />
        </div>
        {article.author.username}
      </ProfileContainer>
      <Color
        layerType={article.thumbnail_type}
        color={article.thumbnail_color[0]}
        pos={article.thumbnail_color[1]}
        deco={article.thumbnail_color[2]}
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
      <ul id="ingredientList">
        {article.ingredient.map((el) => {
          return (
            <li>
              <Link to={"/main?ingredient=" + el[0]}>{el[0]}</Link> - {el[1]}
            </li>
          );
        })}
      </ul>
      <div id="articleContent">{article.content}</div>
      <LikesContainer>
        추천
        <LikeButton className={like ? "active" : null} onClick={handleLikes}>
          <BsHeart className="heart" />
          <BsHeartFill className="heartFill" />
        </LikeButton>
        <span>{likeCount}</span>
        {/* 비로그인시 로그인창 띄우기 */}
        <button id="backBtn" onClick={() => history.push("/main")}>
          목록보기
        </button>
      </LikesContainer>
    </RecipeViewContainer>
  );
}

// 게시물 보는 페이지 입니다
