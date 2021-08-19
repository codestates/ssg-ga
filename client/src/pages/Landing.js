import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "../style/theme";
import {
  faScroll,
  faThList,
  faCocktail,
} from "@fortawesome/free-solid-svg-icons";

const LandingContainer = styled.div`
  animation: fadein 2s;
  -moz-animation: fadein 2s;
  -webkit-animation: fadein 2s;
  -o-animation: fadein 2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media ${(props) => props.theme.mobile} {
    padding: 20px;
    font-size: 1.2rem;
    h5 {
      font-size:1.0rem;
    }
    .landing-image {
      width: 300px;
    }
    .landing-1 {
      flex-direction: column;
    }
    .landing-2 {
      flex-direction: column;
      justify-content: space-around;
      height: 1100px;
    }
    .section1 {
      text-align: center;
    }
    .section2 {
      max-width: 55%;
    }
  }
  @media ${(props) => props.theme.tablet} {
    font-size: 1.2rem;
    .landing-image {
      width: 400px;
    }
  }
  @media ${(props) => props.theme.desktop} {
    font-size: 1.5rem;
  }
`;
const LandingSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 770px;
  color: white;
  &.landing-2 {
    justify-content: space-evenly;
  }
`;
const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  > div {
    padding: 13px;
  }
  &.section2 {
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 380px;
    text-align: center;
    border-radius: 10px;
    border: solid 4px;
    border-color: white;
    box-shadow: ${(props) => (props.backcolor ? props.backcolor : null)} 0px 0px 15px,
      inset ${(props) => (props.backcolor ? props.backcolor : null)} 0px 0px 15px;
  }
  &.section3 {

  }
  &.section4 {
    > div {
      padding: 10px;
      text-align: center;
    }
  }
`;

export default function Landing() {
  return (
    <LandingContainer theme={theme}>
      <LandingSection className="landing-1">
        <SectionBox className="section1">
          <div>
            <h1>칵테일</h1>
            <h1>어렵게만 느껴지셨나요?</h1>
          </div>
          <div>
            <h5>집에서도 만들 수 있는</h5>
            <h5>소맥만큼 쉬운 칵테일 레시피</h5>
            <h5>이제 혼술도 느낌있는 칵테일과 함께</h5>
          </div>
          <div className="main">
            <Link to="/main"><button>레시피 보러가기</button></Link>
          </div>
        </SectionBox>
        <SectionBox>
          <img src="bartender4.png" alt="" className="landing-image"></img>
        </SectionBox>
      </LandingSection>
      <LandingSection className="landing-2">
        <SectionBox className="section2" backcolor="#ff71ce">
          <div>
            <FontAwesomeIcon icon={faScroll} size="5x" color="#ff71ce" />
          </div>
          <div className="text">
            <h2>새로운 레시피</h2>
          </div>
          <div>
            <h5>당신만의 레시피로</h5>
            <h5>새로운 칵테일을 만들어보세요</h5>
          </div>
        </SectionBox>
        <SectionBox className="section2" backcolor="#76ff01">
          <div>
            <FontAwesomeIcon icon={faThList} size="5x" color="#76ff01" />
          </div>
          <div className="text">
            <h2>맞춤형 모아보기</h2>
          </div>
          <div>
            <h5>태그, 재료, 좋아요 등</h5>
            <h5>원하는 리스트 골라보기</h5>
          </div>
        </SectionBox>
        <SectionBox className="section2" backcolor="#fdf14f">
          <div>
            <FontAwesomeIcon icon={faCocktail} size="5x" color="#fdf14f" />
          </div>
          <div className="text">
            <h2>나만의 썸네일</h2>
          </div>
          <div>
            <h5>색깔부터 재료까지</h5>
            <h5>쉽고 다양한 커스터마이징</h5>
          </div>
        </SectionBox>
      </LandingSection>
      <LandingSection>
        <SectionBox className="section3">
          섹션3
        </SectionBox>
      </LandingSection>
      <LandingSection>
        <SectionBox className="section4">
          <div>
            <h5>간단한 레시피부터 정통 레시피, 그리고 논알콜까지</h5>
          </div>
          <div>
            <h1>이 세상 모든 칵테일이 <span>쓰까</span>지는 곳</h1>
            <h1><span>SSG-GA</span></h1>
          </div>
          <div>
            <button>ssg-ga 마시러가기</button>
          </div>
          <div>
            <img src="bartender3.jpg" alt="" className="landing-image"></img>
          </div>
        </SectionBox>
      </LandingSection>
    </LandingContainer>
  );
}

// 랜딩 페이지 입니다
