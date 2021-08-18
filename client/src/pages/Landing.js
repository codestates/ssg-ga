import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
`;
const LandingSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 770px;
  /* border-bottom: 1px solid black; */
  > .lastSection {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  > img {
    width: 500px;
  }
  > div {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    background-color: ${(props) => (props.imageArea ? "red" : null)};
    > .main {
      margin-top: 38px;
    }
    > div {
      flex: 0, 1, auto;
      padding: 20px;
      > h1 {
        font-size: 3rem;
        > span {
          color: #ff71ce;
        }
      }
      > h3 {
        font-size: 1.2rem;
      }
      > a {
        border: 1px solid green;
        color: green;
        padding: 20px;
      }
      > a:hover {
        background-color: green;
        color: white;
      }
    }
  }
`;
const ImageArea = styled.div`
  width: 600px;
  background-color: ${(props) => (props.imageArea ? "red" : null)};
`;
const Section2box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 400px;
  text-align: center;
  border-radius: 10px;
  border: solid 4px;
  /* border-color: ${(props) => (props.backcolor ? props.backcolor : null)}; */
  border-color: white;
  /* filter: drop-shadow(
    0 0 0.75rem ${(props) => (props.backcolor ? props.backcolor : null)}
  ); */
  box-shadow: ${(props) => (props.backcolor ? props.backcolor : null)} 0px 0px
      15px,
    inset ${(props) => (props.backcolor ? props.backcolor : null)} 0px 0px 15px;
  > img {
    display: block;
    width: 80px;
    height: 80px;
  }
  > .cocktail {
    width: 90px;
    height: 90px;
    margin-top: -10px;
  }
  > .text {
    /* color: ${(props) => (props.backcolor ? props.backcolor : null)}; */
    > h1 {
      display: block;
      font-size: 1.9em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      font-weight: bold;
    }
    > h3 {
      font-size: 1.3em;
    }
  }
`;

export default function Landing() {
  return (
    <LandingContainer>
      <LandingSection>
        <div>
          <div>
            <h1>칵테일,</h1>
            <h1>어렵게만 느껴지셨나요?</h1>
          </div>
          <div>
            <h3>집에서도 만들 수 있는,</h3>
            <h3>소맥만큼 쉬운 칵테일 레시피</h3>
            <h3>이제 혼술도 느낌있는 칵테일과 함께</h3>
          </div>
          <div className="main">
            <Link to="/main">레시피 보러가기</Link>
          </div>
        </div>
        <ImageArea>
          <img src="bartender4.png" alt="hi"></img>
        </ImageArea>
      </LandingSection>
      <LandingSection>
        <Section2box backcolor="#ff71ce">
          <FontAwesomeIcon icon={faScroll} size="5x" color="#ff71ce" />
          <div className="text">
            <h1>새로운 레시피</h1>
            <h3>
              당신만의 레시피로
              <br />
              새로운 칵테일을 만들어보세요
            </h3>
          </div>
        </Section2box>
        <Section2box backcolor="#76ff01">
          <FontAwesomeIcon icon={faThList} size="5x" color="#76ff01" />
          <div className="text">
            <h1>맞춤형 모아보기</h1>
            <h3>
              태그, 재료, 좋아요 등
              <br />
              원하는 리스트 골라보기
            </h3>
          </div>
        </Section2box>
        <Section2box backcolor="#fdf14f">
          <FontAwesomeIcon icon={faCocktail} size="5x" color="#fdf14f" />
          <div className="text">
            <h1>나만의 썸네일</h1>
            <h3>
              색깔부터 재료까지
              <br />
              쉽고 다양한 커스터마이징
            </h3>
          </div>
        </Section2box>
      </LandingSection>
      <LandingSection>섹션3</LandingSection>
      <LandingSection>
        <div className="lastSection">
          <div>
            <h3>간단한 레시피부터 정통 레시피, 그리고 논알콜까지</h3>
            <h1>
              이 세상 모든 칵테일이 <span>쓰까</span>지는 곳
            </h1>
            <h1>
              <span>SSG-GA</span>
            </h1>
            <button>ssg-ga 마시러가기</button>
          </div>
          <img src="bartender3.jpg" />
        </div>
      </LandingSection>
    </LandingContainer>
  );
}

// 랜딩 페이지 입니다
