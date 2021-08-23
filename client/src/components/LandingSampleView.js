import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Color from "../components/Color";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import theme from "../style/theme";

const LandingSampleViewContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 700px;
  color: white;

  > span {
    align-self: flex-end;
    margin-bottom: 30px;
  }
  @media ${(props) => props.theme.minimum} {
    padding: 20px;
    > h1 {
      font-size: 20px;
    }
  }
  @media ${(props) => props.theme.mobile} {
    padding: 30px;
    > h1 {
      font-size: 25px;
    }
  }
  > #ingredientList {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > li {
      font-size: 20px;
      > a {
        color: white;
        :hover {
          color: #ff71ce;
        }
      }
    }
  }

  > #articleContent {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    white-space: pre-wrap;
    font-size: 20px;
  }
`;

const TagsContainer = styled.ul`
  display: flex;
  margin: 40px 0;
  > li {
    margin-right: 10px;
    border-radius: 15px;
    padding: 10px;
    background-color: transparent;
    border: 2px solid #fdf250;
    cursor: pointer;
    > a {
      color: #fdf250;
      white-space: nowrap;
    }
    &:hover {
      font-weight: bold;
      background-color: #fdf250;
      > a {
        color: #232b6a;
      }
    }
  }
`;

export default function LandingSampleView({ id }) {
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
    createdAt: "",
    updatedAt: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);

  useEffect(() => {
    const list = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_END_POINT +
            "/article/id/" +
            id +
            `?user_id=${state.userData.id}`
        );

        const article = res.data.data.singleArticle;

        setArticle(article);
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
    };
    list();
  }, [state]);

  return (
    <LandingSampleViewContainer theme={theme}>
      <h3>{article.title}</h3>

      <Color
        layerType={article.thumbnail_type}
        color={article.thumbnail_color[0]}
        pos={article.thumbnail_color[1]}
        deco={article.thumbnail_color[2]}
      />
      <TagsContainer>
        {article.tag !== null
          ? article.tag.map((tag, i) => {
              return (
                <li key={i}>
                  <Link to={"/main?tag=" + tag}>{tag}</Link>
                </li>
              );
            })
          : null}
      </TagsContainer>
    </LandingSampleViewContainer>
  );
}
