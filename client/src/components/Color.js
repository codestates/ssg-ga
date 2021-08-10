import styled from "styled-components";
import glass from "../static/glass.png";

// 색상 표현 박스 크기
const boxSize = `
  width: 250px;
  height: 280px;  
`;

// 색상 표현 컨테이너 스타일 컴포넌트
const ColorContainer = styled.div`
  width: 308px;
  height: 350px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 단색 구현 스타일 컴포넌트
const Mono = styled.div`
  ${boxSize}
  background-color: ${(props) => props.color};
`;

// 레이어 구현 스타일 컴포넌트
const Layer = styled.div`
  ${boxSize}
  display: flex;
  flex-direction: column;
  background-color: red;
`;

// 레이어 내부 구현 스타일 컴포넌트
const InLayer = styled.div`
  flex: 1 0 auto;
  background-color: ${(props) => props.color};
`;

// 그라데이션 구현 스타일 컴포넌트
const Gradient = styled.div`
  ${boxSize}
  background: linear-gradient(180deg, ${(props) => props.color});
`;

// 잔 모양 구현
const Glass = styled.img`
  position: absolute;
  top: 0;
`;

const makeGradient = (colors) => {
  let percent = 0; // 그라데이션 영역 조정 percentage
  const count = colors.length;

  return colors
    .map((color) => {
      percent += 80 / count; // 80이 적절히 표현됨 조정 가능
      return `${color} ${percent}%`;
    })
    .join(",");
};

export default function Color({ layerType, color }) {
  return (
    <ColorContainer>
      <Glass src={glass} alt="glass-bg" />
      {layerType === "mono" ? (
        <Mono color={color[0]} />
      ) : layerType === "layer" ? (
        <Layer>
          {color.map((color) => {
            return <InLayer color={color} />;
          })}
        </Layer>
      ) : (
        <Gradient color={() => makeGradient(color)} />
      )}
    </ColorContainer>
  );
}
