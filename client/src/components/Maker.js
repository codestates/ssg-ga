import styled from "styled-components";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";
import Color from "./Color";

// 픽커 토글 버튼 스타일 컴포넌트
const PickerBtn = styled.div`
  border: 1px solid black;
  width: 70px;
  height: 30px;
  padding: 5px;
  > div {
    width: 100%;
    height: 100%;
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
    <li>
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
        삭제
      </button>
      {onToggle ? (
        <>
          <PopOver>
            <Cover
              onClick={() => {
                setOnToggle(false);
              }}
            />
            <SketchPicker color={selectedColor} onChange={colorHandleChange} />
          </PopOver>
        </>
      ) : null}
    </li>
  );
}

// 썸네일 제작 컨테이너 스타일 컴포넌트
const MakerContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

// 레이어 선택 목록 스타일 컴포넌트
const SelectLayer = styled.ul`
  display: flex;
  > li {
    border: 1px solid black;
    margin-right: 10px;
  }
`;

// 픽커 컨테이너 스타일 컴포넌트
const PickerContainer = styled.ul`
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
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
      />
      <SelectLayer>
        <li
          onClick={() => {
            setInputValue({ ...inputValue, thumbnail_type: "mono" });
            setColor([color[0]]);
          }}
        >
          원색
        </li>
        <li
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
    </MakerContainer>
  );
}
