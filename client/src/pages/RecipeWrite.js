import styled from "styled-components";
import { useEffect, useState } from "react";
import Maker from "../components/Maker";
import theme from "../style/theme";
import axios from "axios";
import swal from "sweetalert";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { inCupDecoArr, outCupDecoArr } from "../style/decoSet";
import { TiDelete } from "react-icons/ti";

axios.defaults.withCredentials = true;

// 게시물 작성 컨테이너 스타일 컴포넌트
const WriteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  min-height: 800px;
  padding: 30px;
  color: white;
  @media ${(props) => props.theme.minimum} {
    grid-template-columns: 90%;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 48% 48%;
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: 1fr 1fr;
  }

  > #makerWrap {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > #btnWrap {
      display: flex;
      justify-content: space-evenly;
      > button {
        padding: 5px;
        font-size: 20px;
        margin: 10px;
        flex: 1 0 auto;
        cursor: pointer;
      }
    }
  }
`;

// 게시물 정보 작성 스타일 컴포넌트
const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  font-size: 25px;
  > h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  > #titleWrap {
    display: flex;
    height: 45px;
    font-size: 1em;
    line-height: 45px;
    margin-bottom: 20px;
    /* > div {
      width: 30%;
      text-align: center;
    } */
    > input {
      font-size: 0.7em;
      height: 45px;
      /* flex: 7 0 auto; */
      flex: 1 0 auto;
      text-align: center;
      border-radius: 8px;
    }
  }
  > ul {
    > #ingredientLabel {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-column-gap: 2%;
      > div {
        text-align: center;
      }
    }
  }
  > button {
    margin: 20px 0;
    padding: 5px;
    font-size: 0.7em;
  }
  > textarea {
    flex: 0 1 250px;
    padding: 10px;
    font-size: 0.7em;
    border-radius: 8px;
    resize: none;
    text-align: center;
  }
`;

// 게시물 태그 작성 스타일 컴포넌트
const TagInput = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 20px;

  /* > #tagLabel {
    font-size: 25px;
    line-height: 45px;
    width: 30%;
    text-align: center;
  } */
  > #tagInputWrap {
    /* width: 70%; */
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    > input {
      font-size: 0.7em;
      line-height: 100%;
      flex: 1;
      height: 45px;
      border-radius: 8px;
      text-align: center;
    }
    > ul {
      width: 100%;
      display: flex;
      margin-top: 10px;
      flex-wrap: wrap;
      > li {
        font-size: 0.7em;
        line-height: 100%;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        word-break: keep-all;
        border-radius: 15px;
        background-color: #fdf250;
        color: #232b6a;
        border: 2px solid #fdf250;
        padding: 10px;
        &:hover {
          background-color: transparent;
          color: #fdf250;
        }
      }
    }
  }
`;

// 게시물 태그 input 스타일 컴포넌트
const IngredientInput = styled.li`
  display: grid;
  grid-template-columns: 48% 48% 2%;
  grid-column-gap: 2%;
  margin-top: 10px;
  > input {
    border-radius: 8px;
    text-align: center;
    height: 45px;
  }
  > div {
    display: flex;
  }
  > input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  div {
    width: 30px;
    > button {
      padding: 0;
      font-size: 30px;
      line-height: 30px;
      border: none;
      cursor: auto;
      > svg {
        cursor: pointer;
        color: #ff71ce;
      }
      > svg:hover {
        color: white;
      }
      &:hover {
        box-shadow: none;
      }
      &:disabled {
        > svg {
          color: gray;
          cursor: auto;
        }
      }
    }
  }
`;

export default function RecipeWrite() {
  const [inputValue, setInputValue] = useState({
    title: "",
    tag: [],
    thumbnail_type: "mono",
    content: "",
  });
  const [ingredients, setIngredient] = useState([["", ""]]); // 게시글 재료 목록 작성 핸들링
  const [color, setColor] = useState(["#98EB77"]); // 게시글 썸네일 컬러 목록 핸들링
  const [pos, setPos] = useState([]);
  const [deco, setDeco] = useState(() => {
    const inCup = {};
    for (let el of inCupDecoArr) {
      inCup[el] = false;
    }

    const outCup = {};
    for (let el of outCupDecoArr) {
      outCup[el] = false;
    }
    return [inCup, outCup];
  });
  const history = useHistory();
  const state = useSelector((state) => state.userReducer);

  let { id } = useParams();

  useEffect(async () => {
    if (id !== undefined) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_END_POINT + "/article/id/" + id
        );

        if (res.status === 200) {
          const {
            title,
            author_id,
            tag,
            thumbnail_type,
            thumbnail_color,
            ingredient,
            content,
          } = res.data.data.singleArticle;

          // 잘못된 접근 확인
          if (author_id !== state.userData.id) {
            swal({
              title: "Error",
              text: "잘못된 접근입니다",
              icon: "error",
              button: "확인",
            }).then((res) => {
              history.goBack();
            });
          }
          setInputValue({
            title,
            tag,
            thumbnail_type,
            content,
          });
          setIngredient(ingredient);
          setColor(thumbnail_color[0]);
          setPos(thumbnail_color[1]);
          setDeco(thumbnail_color[2]);
        }
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
    }
  }, []);

  const addTag = (event) => {
    const filtered = inputValue.tag.filter((el) => el === event.target.value);

    if (event.target.value !== "" && filtered.length === 0) {
      setInputValue({
        ...inputValue,
        tag: [...inputValue.tag, event.target.value],
      });
    }
    event.target.value = "";
  };

  const removeTag = (clickedIndex) => {
    setInputValue(() => {
      return {
        ...inputValue,
        tag: inputValue.tag.filter((_, index) => {
          return index !== clickedIndex;
        }),
      };
    });
  };

  const addIngredient = () => {
    setIngredient([...ingredients, ["", ""]]);
  };

  const handleIngredientInput = (event, index, type) => {
    const copied = ingredients.slice();

    copied[index][type] = event.target.value;
    setIngredient(copied);
  };

  const deleteIngredient = (selectIndex) => {
    const filtered = ingredients.filter((_, index) => {
      return selectIndex !== index;
    });

    setIngredient(filtered);
  };

  const ingredientValidCheck = () => {
    const filtered = ingredients.filter((el) => {
      return el[0] === "" || el[1] === "";
    });

    return filtered.length !== 0;
  };

  const postArticle = async () => {
    if (inputValue.title === "" || ingredientValidCheck()) {
      swal({
        title: "Wrong information",
        text: "제목과 재료, 용량은 빈칸일 수 없습니다.",
        icon: "warning",
        button: "confirm",
      });
    } else {
      try {
        let res;
        if (id !== undefined) {
          res = await axios.patch(
            process.env.REACT_APP_END_POINT + "/article/id/" + id,
            {
              author_id: state.userData.id,
              ...inputValue,
              thumbnail_color: [color, pos, deco],
              ingredient: ingredients,
            }
          );
        } else {
          res = await axios.post(process.env.REACT_APP_END_POINT + "/article", {
            author_id: state.userData.id,
            ...inputValue,
            thumbnail_color: [color, pos, deco],
            ingredient: ingredients,
          });
        }

        if (res.status === 200) {
          if (res.data.id) {
            id = res.data.id;
          }
          swal({
            title: "Success",
            text: "게시글 작성에 성공했습니다!",
            icon: "success",
            button: "confirm",
          }).then((result) => {
            if (result) {
              history.push(`/view/${id}`);
            }
          });
        }
      } catch (err) {
        swal({
          title: "Wrong information",
          text: "게시글 작성 중 에러가 발생했습니다.",
          icon: "error",
          button: "confirm",
        });
      }
    }
  };

  return (
    <WriteContainer theme={theme}>
      <RecipeInfo>
        <h1>레시피 작성</h1>
        <div id="titleWrap">
          {/* <div>제목</div> */}
          <input
            type="text"
            value={inputValue.title}
            onChange={(event) => {
              setInputValue({ ...inputValue, title: event.target.value });
            }}
            placeholder="제목을 입력해주세요."
          />
        </div>
        <TagInput>
          {/* <div id="tagLabel">태그</div> */}
          <div id="tagInputWrap">
            <input
              type="text"
              onKeyUp={(event) =>
                event.key === "Enter" ? addTag(event) : null
              }
              placeholder="해시태그를 입력할 수 있습니다."
            />
            <ul>
              {inputValue.tag.map((el, index) => {
                return <li onClick={() => removeTag(index)}>{el}</li>;
              })}
            </ul>
          </div>
        </TagInput>
        <ul>
          <li id="ingredientLabel">
            <div>재료</div>
            <div>용량</div>
          </li>
          {ingredients.map((el, index) => {
            return (
              <IngredientInput>
                <input
                  type="text"
                  value={el[0]}
                  onChange={(event) => handleIngredientInput(event, index, 0)}
                  placeholder="재료명을 입력해주세요."
                />
                <input
                  type="text"
                  value={el[1]}
                  onChange={(event) => handleIngredientInput(event, index, 1)}
                  placeholder="용량과 단위를 함께 입력해주세요."
                />
                <div>
                  <button
                    onClick={() => deleteIngredient(index)}
                    disabled={ingredients.length === 1 ? "disabled" : null}
                  >
                    <TiDelete />
                  </button>
                </div>
              </IngredientInput>
            );
          })}
        </ul>
        <button onClick={addIngredient}>+ 재료 추가</button>
        <textarea
          value={inputValue.content}
          onChange={(event) =>
            setInputValue({ ...inputValue, content: event.target.value })
          }
          placeholder="레시피에 대한 소개나 설명을 입력할 수 있습니다."
        />
      </RecipeInfo>
      <div id="makerWrap">
        <Maker
          inputValue={inputValue}
          setInputValue={setInputValue}
          color={color}
          setColor={setColor}
          pos={pos}
          setPos={setPos}
          deco={deco}
          setDeco={setDeco}
        />
        <div id="btnWrap">
          <button onClick={() => history.goBack()}>취소</button>
          <button onClick={postArticle}>게시</button>
        </div>
      </div>
    </WriteContainer>
  );
}

// 게시물 작성 페이지 입니다
