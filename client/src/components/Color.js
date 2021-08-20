import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import theme from "../style/theme";

// 색상 표현 컨테이너 스타일 컴포넌트
const pathCheck = (path) => {
  return path === "write" || path === "view";
};
const ColorContainer = styled.div`
  ${(props) =>
    pathCheck(props.path)
      ? `width: 350px;height: 350px;`
      : `width: 250px;height: 250px;`}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(200, 100, 200, 0.8); */

  > #glassOutContainer {
    position: relative;
    ${(props) => (pathCheck(props.path) ? `left: 0;` : `left:-40px;`)}
    display: flex;
    justify-content: center;

    > #glassContainer {
      position: relative;
      ${(props) =>
    pathCheck(props.path)
      ? `
          width: 110px; 
          height: 240px; 
          border-top-left-radius: 4px; 
          border-top-right-radius: 4px;
          border-bottom-left-radius: 40px;
          border-bottom-right-radius: 40px;
          transform: perspective(10px) rotateX(-1deg);`
      : `
          width: 55px; 
          height: 120px; 
          border-top-left-radius: 2px; 
          border-top-right-radius: 2px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          transform: perspective(7px) rotateX(-1deg);`}
      overflow: hidden;
      background-color: #d1e7f8;
      z-index: 1;
      > .inCup {
        position: absolute;
        width: 70%;
        height: 80%;
        left: 15%;
        bottom: 10%;
        z-index: 2;
      }
      > .colorWrap {
        position: absolute;
        top: 5%;
        width: 100%;
        height: 100%;
      }
      > #glass {
        position: absolute;
        width: 100%;
        height: 100%;
        ${(props) =>
    pathCheck(props.path)
      ? `
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
            border-bottom: 8px solid #d1e7f8;
            border-left: 8px solid #d1e7f8;
            border-right: 8px solid #d1e7f8;`
      : `
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            border-bottom: 4px solid #d1e7f8;
            border-left: 4px solid #d1e7f8;
            border-right: 4px solid #d1e7f8;`}
        z-index: 1;
      }
      > #shadow {
        position: absolute;
        width: 100%;
        height: 120%;
        top: 15px;
        transform: rotateZ(20deg);
        left: 60%;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
    > .outCup {
      position: absolute;
      width: 100%;
      z-index: 2;
      -webkit-transform-style: preserve-3d;
      -webkit-transform: translateZ(5px);
      &.fruit {
        top: -30%;
        left: -50%;
      }
      &.umbrella {
        top: -35%;
        right: -65%;
      }
      &.straw {
        width: 40%;
        top: -30%;
        right: 0%;
      }
      &.strawBent {
        width: 100%;
        top: -30%;
        right: -50%;
      }
      &.stick {
        width: 90%;
        top: -30%;
        left: -15%;
      }
    }
    > #glassBottom {
      position: absolute;
      -webkit-transform-style: preserve-3d;
      -webkit-transform: translateZ(-5px);
      ${(props) =>
    pathCheck(props.path)
      ? `width:160px;bottom:-60px;`
      : `width:80px;bottom:-30px;`}
      opacity: 0.9;
    }
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

const ControlWrap = styled.div`
  position: absolute;
  left: -10px;
  @media ${(props) => props.theme.minimum} {
    left: 10px;
  }
  width: 80px;
  height: 280px;
  /* background-color: rgba(255, 255, 255, 0.5); */
  /* border: 3px solid white; */
  box-sizing: content-box;
  border-radius: 20px;

  > .controlPreview {
    position: absolute;
    left: 40px;
    width: 20px;
    height: 100%;
  }
`;

const ControlBar = styled.div`
  position: absolute;
  width: 30px;
  height: 280px;
`;

const ControlPointer = styled.div`
  position: absolute;
  top: ${(props) => props.pos}%;
  > input {
    position: relative;
    width: 100%;
    height: 20px;
    text-align: center;
    top: -15px;
    z-index: 2;
    border: 5px ridge white;
    background-color: rgb(70, 70, 70);
    color: white;
    border-radius: 5px;
    box-sizing: content-box;
    left: -10px;
  }
  > div {
    position: absolute;
    width: 70px;
    height: 10px;
    top: -5px;
    border: 3px ridge white;
    border-radius: 5px;
    z-index: 1;
  }
  > input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

function ColorStack({ layerType, color, pos, alterClass }) {
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

  return layerType === "mono" ? (
    <Mono className={alterClass} color={color[0]} />
  ) : layerType === "layer" ? (
    <Layer className={alterClass}>
      {color.map((color, index) => {
        return <InLayer color={color} pos={makeLayerRatio(index)} />;
      })}
    </Layer>
  ) : (
    <Gradient
      className={alterClass}
      color={() => makeGradient(color)}
      pos={pos}
    />
  );
}

export default function Color({
  layerType,
  color,
  writeMode,
  pos,
  setPos,
  deco,
}) {
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

  const classSet = {
    outCupCherry: "fruit",
    outCupLemonGreen: "fruit",
    outCupLemonYellow: "fruit",
    stick: "stick",
    strawBent: "strawBent",
    umbrellaGreen: "umbrella",
    umbrellaRed: "umbrella",
    umbrellaYellow: "umbrella",
    strawGreen: "straw",
    strawRed: "straw",
    strawYellow: "straw",
  };

  // 색상 표현 박스 크기
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

  const handlePosInput = (event, index) => {
    const copied = pos.slice();
    const value = event.target.value;
    if (value >= 0 && value <= 100) {
      copied[index] = Number(event.target.value);
    }
    setPos(copied);
  };

  return (
    <ColorContainer path={path}>
      {writeMode && layerType !== "mono" ? (
        <ControlWrap theme={theme}>
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
          <ColorStack
            color={color}
            layerType={layerType}
            pos={pos}
            alterClass="controlPreview"
          />
        </ControlWrap>
      ) : null}
      <div id="glassOutContainer">
        <div id="glassContainer">
          <div id="glass"></div>
          <div id="shadow"></div>
          {Object.keys(deco[0]).map((el) => {
            return deco[0][el] ? (
              <img
                className="inCup"
                src={"../thumbnail-effect/" + el + ".png"}
                alt={el}
              />
            ) : null;
          })}

          <ColorStack
            color={color}
            layerType={layerType}
            pos={pos}
            alterClass="colorWrap"
          />
        </div>
        <img src="../glass-bottom.png" id="glassBottom" />
        {Object.keys(deco[1]).map((el) => {
          return deco[1][el] ? (
            <img
              className={"outCup " + classSet[el]}
              src={"../thumbnail-effect/" + el + ".png"}
              alt={el}
            />
          ) : null;
        })}
      </div>
    </ColorContainer>
  );
}
