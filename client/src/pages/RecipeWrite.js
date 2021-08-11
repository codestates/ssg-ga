import styled from "styled-components";
import { useEffect, useState } from "react";
import Maker from "../components/Maker";
import theme from "../style/theme";
import axios from "axios";
import swal from "sweetalert";
import { useHistory, useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

// 게시물 작성 컨테이너 스타일 컴포넌트
const WriteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 90vh;
  @media ${(props) => props.theme.minimum} {
    grid-template-columns: 1fr;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
  }

  > #makerWrap {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > #btnWrap {
      display: flex;
      justify-content: space-evenly;
      > button {
        margin: 10px;
        flex: 1 0 auto;
      }
    }
  }
`;

// 게시물 정보 작성 스타일 컴포넌트
const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  > textarea {
    resize: none;
  }
`;

// 게시물 태그 작성 스타일 컴포넌트
const TagInput = styled.div`
  display: flex;
  > ul {
    display: flex;
    > li {
      cursor: pointer;
      border: 1px solid black;
    }
  }
`;

// 게시물 태그 input 스타일 컴포넌트
const IngredientInput = styled.li``;

export default function RecipeWrite() {
  const [inputValue, setInputValue] = useState({
    title: "",
    tag: [],
    thumbnail_type: "mono",
    content: "",
  });
  const [ingredients, setIngredient] = useState([["", ""]]); // 게시글 재료 목록 작성 핸들링
  const [color, setColor] = useState(["#000000"]); // 게시글 썸네일 컬러 목록 핸들링
  const history = useHistory();

  let { id } = useParams();

  useEffect(async () => {
    if (id !== undefined) {
      // 잘못된 접근 확인
      try {
        const res = await axios.get(
          process.env.REACT_APP_END_POINT + "/article/id/" + id
        );

        if (res.status === 200) {
          const {
            title,
            tag,
            thumbnail_type,
            thumbnail_color,
            ingredient,
            content,
          } = res.data.data.singleArticle;

          setInputValue({
            title,
            tag,
            thumbnail_type,
            content,
          });
          setIngredient(ingredient);
          setColor(thumbnail_color);
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
              author_id: "1",
              ...inputValue,
              thumbnail_color: color,
              ingredient: ingredients,
            }
          );
        } else {
          res = await axios.post(process.env.REACT_APP_END_POINT + "/article", {
            author_id: "1",
            ...inputValue,
            thumbnail_color: color,
            ingredient: ingredients,
          });
        }

        if (res.status === 200) {
          if (res.data.id) {
            id = res.data.id;
          }
          swal({
            title: "Success",
            text: "게시글 작성에 성공했습니다! 메인 페이지로 이동합니다.",
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
        <div>
          제목
          <input
            type="text"
            value={inputValue.title}
            onChange={(event) => {
              setInputValue({ ...inputValue, title: event.target.value });
            }}
          />
        </div>
        <TagInput>
          태그
          <ul>
            {inputValue.tag.map((el, index) => {
              return <li onClick={() => removeTag(index)}>{el}</li>;
            })}
          </ul>
          <input
            type="text"
            onKeyUp={(event) => (event.key === "Enter" ? addTag(event) : null)}
          />
        </TagInput>
        <ul>
          <li>
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
                />
                <input
                  type="number"
                  value={el[1]}
                  onChange={(event) => handleIngredientInput(event, index, 1)}
                />
                ml
                <button
                  onClick={() => deleteIngredient(index)}
                  disabled={ingredients.length === 1 ? "disabled" : null}
                >
                  삭제
                </button>
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
        />
      </RecipeInfo>
      <div id="makerWrap">
        <Maker
          inputValue={inputValue}
          setInputValue={setInputValue}
          color={color}
          setColor={setColor}
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
