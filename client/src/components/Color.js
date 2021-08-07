import styled from "styled-components";

const boxSize = `
  width: 150px;
  height: 250px;  
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

export default function Color({ thumb }) {
  {
    return thumb.layertype === "mono" ? (
      <Mono color={thumb.color[0]} />
    ) : thumb.layertype === "layer" ? (
      <Layer>
        {thumb.color.map((color) => {
          return <InLayer color={color} />;
        })}
      </Layer>
    ) : (
      <Gradient color={() => makeGradient(thumb.color)} />
    );
  }
}
