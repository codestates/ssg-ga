import styled from "styled-components";

const IndicatorContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: span 4;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media ${(props) => props.theme.minimum} {
    grid-column-end: span 1;
  }
  @media ${(props) => props.theme.mobile} {
    grid-column-end: span 1;
  }
  @media ${(props) => props.theme.tablet} {
    grid-column-end: span 3;
  }
  @media ${(props) => props.theme.desktop} {
    grid-column-end: span 4;
  }

  > #loadingEffect {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #dddddd;

    > #effectWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100px;
      height: 100px;
      animation: updown 3s infinite alternate;
      @keyframes updown {
        to {
          top: 20%;
        }
        from {
          top: -20%;
        }
      }

      @keyframes rotateEffect {
        to {
          transform: rotate(0deg);
        }
        from {
          transform: rotate(360deg);
        }
      }
      > div {
        position: absolute;
        border-radius: 44%;
        opacity: 0.4;
        top: -250%;
        transform-origin: 50% 48%;
        background: #ff71ce;
      }

      > #firstEffect {
        width: 300px;
        height: 300px;
        animation: rotateEffect 3s infinite linear;
      }
      > #secondEffect {
        width: 307px;
        height: 307px;
        animation: rotateEffect 7s infinite linear;
      }
      > #thirdEffect {
        width: 315px;
        height: 315px;
        opacity: 0.3;
        animation: rotateEffect 10s infinite linear;
      }
    }
  }
`;

export default function LoadingIndicator() {
  return (
    <IndicatorContainer>
      <div id="loadingEffect">
        <div id="effectWrap">
          <div id="firstEffect"></div>
          <div id="secondEffect"></div>
          <div id="thirdEffect"></div>
        </div>
      </div>
      불러오는 중입니다...
    </IndicatorContainer>
  );
}
