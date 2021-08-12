import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import glassThumb from "../static/glass-thumb.png";
import glassView from "../static/glass-view.png";

// 색상 표현 컨테이너 스타일 컴포넌트
const ColorContainer = styled.div`
  ${(props) =>
    props.path === "write" || props.path === "view"
      ? `
        width: 308px;
        height: 350px;`
      : `
          width: 250px;
          height: 250px;
        `}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  /* overflow: hidden; */
  > .colorWrap {
    ${(props) => props.boxSize}
  }
`;

// 단색 구현 스타일 컴포넌트
const Mono = styled.div`
  background-color: ${(props) => props.color};
`;

// 레이어 구현 스타일 컴포넌트
const Layer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;

// 레이어 내부 구현 스타일 컴포넌트
const InLayer = styled.div`
  flex: ${(props) => props.pos} 0 auto;
  background-color: ${(props) => props.color};
`;

// 그라데이션 구현 스타일 컴포넌트
const Gradient = styled.div`
  background: linear-gradient(180deg, ${(props) => props.color});
`;

// 잔 모양 구현
const Glass = styled.div`
  ${(props) =>
    props.path === "write" || props.path === "view"
      ? `
          width: 308px;
          height: 350px;
          background-image: url(${glassView});
          `
      : `
          width: 250px;
          height: 250px;
          background-image: url(${glassThumb});
        `}
  background-size: 100%;
  position: absolute;
  top: 0; ;
`;

const ControlWrap = styled.div`
  height: 280px;
`;

const ControlBar = styled.div`
  position: absolute;
  left: -30px;
  width: 20px;
  height: 280px;
  /* background-color: black; */
`;

const ControlPointer = styled.div`
  position: absolute;
  top: ${(props) => props.pos}%;
  z-index: 9;
  > input {
    position: relative;
    width: 100%;
    height: 20px;
    top: -10px;
    z-index: 9;
  }
  > div {
    position: absolute;
    top: 0;
    width: 350px;
    border-top: 2px dashed rgba(0, 0, 0, 0.45);
  }
  > input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export default function Color({ layerType, color, writeMode, pos, setPos }) {
  const path = useLocation().pathname.split("/")[1];
  const calcPos = () => {
    return color.map((_, index) => {
      if (layerType === "gradient") {
        return parseInt((100 / (color.length - 1)) * index);
      } else {
        return parseInt((100 / color.length) * index);
      }
    });
  };

  // 색상 표현 박스 크기
  const boxSize =
    path === "view" || path === "write"
      ? `
          width: 250px;
          height: 280px;  
        `
      : `
          width: 250px;
          height: 130px;  
        `;
  useEffect(() => {
    setPos === undefined ? (
      <></>
    ) : (
      setPos(
        calcPos().sort((a, b) => {
          return a - b;
        })
      )
    );
  }, [color, layerType]);

  const makeGradient = (colors) => {
    return colors
      .map((color, index) => {
        return `${color} ${pos[index]}%`;
      })
      .join(",");
  };

  const makeLayerRatio = (index) => {
    return index === pos.length - 1
      ? 100 - pos[index]
      : pos[index + 1] - pos[index];
  };

  const handlePosInput = (event, index) => {
    const copied = pos.slice();
    const value = event.target.value;
    if (value >= 0 && value <= 100) {
      copied[index] = Number(event.target.value);
    }
    setPos(copied);
  };

  return (
    <ColorContainer path={path} boxSize={boxSize}>
      {writeMode && layerType !== "mono" ? (
        <ControlWrap>
          <ControlBar>
            {pos.map((el, index) => {
              return layerType === "layer" && index === 0 ? null : (
                <ControlPointer pos={el}>
                  <input
                    type="number"
                    value={pos[index]}
                    min={0}
                    max={100}
                    onChange={(event) => {
                      handlePosInput(event, index);
                    }}
                  />
                  <div></div>
                </ControlPointer>
              );
            })}
          </ControlBar>
        </ControlWrap>
      ) : null}
      <Glass path={path} />
      {layerType === "mono" ? (
        <Mono className="colorWrap" color={color[0]} />
      ) : layerType === "layer" ? (
        <Layer className="colorWrap">
          {color.map((color, index) => {
            return <InLayer color={color} pos={makeLayerRatio(index)} />;
          })}
        </Layer>
      ) : (
        <Gradient
          className="colorWrap"
          color={() => makeGradient(color)}
          pos={pos}
        />
      )}
    </ColorContainer>
  );
}
