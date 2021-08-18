import { Link } from "react-router-dom";
import styled from "styled-components";

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
  border-bottom: 1px solid black;
  > div {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    background-color: ${(props) => (props.imageArea ? "red" : null)};
    > div {
      flex: 0, 1, auto;
      padding: 20px;
      > h1 {
        font-size: 3rem;
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
  width: 25%;
  height: 350px;
  text-align: center;
  border-radius: 10px;
  background-color: ${(props) => (props.backcolor ? props.backcolor : null)};
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
    > h1 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      font-weight: bold;
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
          <div>
            <Link to="/main">레시피 보러가기</Link>
          </div>
        </div>
        <ImageArea>
          <img src="bartender4.png" alt="hi"></img>
        </ImageArea>
      </LandingSection>
      <LandingSection>
        <Section2box backcolor="orange">
          <img src="cocktail4.png" />
          <div className="text">
            <h1>레시피 공유</h1>
            <h3>
              쉽게 만들 수 있는 레시피를
              <br />
              모두 볼 수 있게 공유할 수 있어요
            </h3>
          </div>
        </Section2box>
        <Section2box backcolor="powderblue">
          <img src="menu.png" />
          <div className="text">
            <h1>맞춤형 모아보기</h1>
            <h3>
              원하는 재료나 태그를 눌러보면
              <br />
              원하는 칵테일을 볼 수 있습니다
            </h3>
          </div>
        </Section2box>
        <Section2box backcolor="red">
          <img src="bookmark-white.png" />
          <div className="text">
            <h1>맘에드는 레시피 수집</h1>
            <h3>
              추천 버튼을 눌러보세요
              <br />
              언제든 다시 볼 수 있습니다!
            </h3>
          </div>
        </Section2box>
        <Section2box backcolor="green">
          <img className="cocktail" src="cocktail4.png" />
          <div className="text">
            <h1>나만의 썸네일</h1>
            <h3>
              썸네일로 내 칵테일을 표현합니다
              <br />
              멋지게 표현해주세요
            </h3>
          </div>
        </Section2box>
      </LandingSection>
      <LandingSection>섹션3</LandingSection>
      <LandingSection>섹션4</LandingSection>
    </LandingContainer>
  );
}

// 랜딩 페이지 입니다
