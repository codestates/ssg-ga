import styled from "styled-components";
import { SketchPicker } from "react-color";
import { useState } from "react";
import Color from "./Color";
import DecoSelector from "./DecoSelector";
import { TiDelete } from "react-icons/ti";

const PickerList = styled.li`
  > button {
    text-align: center;
    padding: 0;
    border: none;
    &:hover {
      box-shadow: none;
    }
    &:disabled {
      > svg {
        color: gray;
        cursor: auto;
        &:hover {
          color: gray;
        }
      }
    }

    > svg {
      cursor: pointer;
      font-size: 30px;
      color: #ff71ce;
      &:hover {
        color: white;
      }
    }
  }
`;

// 픽커 토글 버튼 스타일 컴포넌트
const PickerBtn = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  width: 70px;
  height: 30px;
  padding: 5px;
  margin-right: 10px;
  cursor: pointer;
  :hover {
    border: 3px solid white;
  }
  > div {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.color};
  }
`;

// 컬러 픽커 팝업 스타일 컴포넌트
const PopOver = styled.div`
  position: absolute;
  z-index: 1;
`;

// 픽커 외 부분 커버 스타일 컴포넌트
const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// 컬러 픽커 토글 버튼 컴포넌트
function ColorList({ selectedColor, colorArr, setColor, colorIndex }) {
  const [onToggle, setOnToggle] = useState(false);
  const [select, setSelect] = useState(selectedColor);

  const colorHandleChange = (color, event) => {
    setSelect(color.hex);
    const copied = colorArr.slice();
    copied[colorIndex] = select;
    setColor(copied);
  };

  const deleteColor = () => {
    const filtered = colorArr.filter((_, index) => {
      return index !== colorIndex;
    });

    setColor(filtered);
  };

  return (
    <PickerList>
      <PickerBtn
        color={selectedColor}
        onClick={() => {
          setOnToggle(!onToggle);
        }}
      >
        <div></div>
      </PickerBtn>
      <button
        onClick={deleteColor}
        disabled={colorArr.length <= 2 ? "disabled" : null}
      >
        <TiDelete />
      </button>
      {onToggle ? (
        <>
          <PopOver>
            <Cover
              onClick={() => {
                setOnToggle(false);
              }}
            />
            <SketchPicker
              color={selectedColor}
              onChange={colorHandleChange}
              disableAlpha={true}
            />
          </PopOver>
        </>
      ) : null}
    </PickerList>
  );
}

// 썸네일 제작 컨테이너 스타일 컴포넌트
const MakerContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  > button {
    margin: 20px 0;
    padding: 5px 10px;
    font-size: 20px;
  }
`;

// 레이어 선택 목록 스타일 컴포넌트
const SelectLayer = styled.ul`
  display: flex;
  margin: 20px 0;
  > li {
    border: 1px solid #dddddd;
    border-radius: 10px;
    padding: 10px;
    color: #dddddd;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      box-shadow: white 0 0 15px, inset white 0 0 15px;
    }
    &.active {
      color: white;
      font-weight: bold;
      border: 3px solid white;
      box-shadow: #ff71ce 0 0 15px, inset #ff71ce 0 0 15px;
    }
  }
`;

// 픽커 컨테이너 스타일 컴포넌트
const PickerContainer = styled.ul`
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    margin-bottom: 10px;
  }
`;

// 썸네일 커스터마이징 컴포넌트
export default function Maker({
  inputValue,
  setInputValue,
  color,
  setColor,
  pos,
  setPos,
  deco,
  setDeco,
}) {
  const addColor = () => {
    setColor([...color, color[color.length - 1]]);
  };

  return (
    <MakerContainer>
      <Color
        layerType={inputValue.thumbnail_type}
        color={color}
        writeMode={true}
        pos={pos}
        setPos={setPos}
        deco={deco}
      />
      <SelectLayer>
        <li
          className={inputValue.thumbnail_type === "mono" ? "active" : null}
          onClick={() => {
            setInputValue({ ...inputValue, thumbnail_type: "mono" });
            setColor([color[0]]);
          }}
        >
          원색
        </li>
        <li
          className={inputValue.thumbnail_type === "gradient" ? "active" : null}
          onClick={() => {
            setInputValue({ ...inputValue, thumbnail_type: "gradient" });
            color.length === 1
              ? setColor([color[0], "#FFFFFF"])
              : setColor(color);
          }}
        >
          그라데이션
        </li>
        <li
          className={inputValue.thumbnail_type === "layer" ? "active" : null}
          onClick={() => {
            setInputValue({ ...inputValue, thumbnail_type: "layer" });
            color.length === 1
              ? setColor([color[0], "#FFFFFF"])
              : setColor(color);
          }}
        >
          레이어
        </li>
      </SelectLayer>
      <PickerContainer>
        {color.map((el, index) => {
          return (
            <ColorList
              key={"colorlist" + index}
              selectedColor={el}
              colorArr={color}
              setColor={setColor}
              colorIndex={index}
            />
          );
        })}
      </PickerContainer>
      {inputValue.thumbnail_type !== "mono" ? (
        <button onClick={addColor}>+ 색 추가</button>
      ) : null}
      <DecoSelector deco={deco} setDeco={setDeco} />
    </MakerContainer>
  );
}