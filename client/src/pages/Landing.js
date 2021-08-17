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
    justify-content: space-evenly;
    align-items: space-around;
    background-color: ${props => props.imageArea ? "red" : null};
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
  background-color: ${props => props.imageArea ? "red" : null};
`
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
          <div >
            <Link to="/main">레시피 보러가기</Link>
          </div>
        </div>
        <ImageArea>
          <img src="https://www.liquor.com/thmb/fO-COKLw_iEA28v8K4XQjzMhkfw=/735x0/very-sexy-martini-720x720-primary-b1212ebf73f54f898a56f7f0b60c0a34.jpg" alt="hi"></img>
        </ImageArea>
      </LandingSection>
      <LandingSection>섹션2</LandingSection>
      <LandingSection>섹션3</LandingSection>
      <LandingSection>섹션4</LandingSection>
    </LandingContainer>
  );
}

// 랜딩 페이지 입니다
