import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../style/theme";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  h1 {
    @media ${(props) => props.theme.minimum} {
      font-size: 28px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 28px;
    }
    @media ${(props) => props.theme.tablet} {
      font-size: 36px;
    }
    @media ${(props) => props.theme.desktop} {
      font-size: 50px;
    }
  }

  h2 {
    @media ${(props) => props.theme.minimum} {
      font-size: 24px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 24px;
    }
    @media ${(props) => props.theme.tablet} {
      font-size: 28px;
    }
    @media ${(props) => props.theme.desktop} {
      font-size: 36px;
    }
  }

  h5 {
    @media ${(props) => props.theme.minimum} {
      font-size: 16px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 16px;
    }
    @media ${(props) => props.theme.tablet} {
      font-size: 16px;
    }
    @media ${(props) => props.theme.desktop} {
      font-size: 20px;
    }
  }

  button {
    @media ${(props) => props.theme.minimum} {
      font-size: 14px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 14px;
    }
    @media ${(props) => props.theme.tablet} {
      font-size: 14px;
    }
    @media ${(props) => props.theme.desktop} {
      font-size: 18px;
    }
  }

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

const SectionBox = styled.section`
  /* SECTION COMMON */
  width: 100%;
  min-height: 800px;
  padding: 50px 30px;
  display: grid;
  @media ${(props) => props.theme.minimum} {
    padding: 50px 10px;
  }
  @media ${(props) => props.theme.mobile} {
    padding: 50px 20px;
  }

  /* SECTION 1 */
  &#section1 {
    grid-template-columns: 60% 40%;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media ${(props) => props.theme.minimum} {
        text-align: center;
      }
      @media ${(props) => props.theme.mobile} {
        text-align: center;
      }

      > h1 {
        margin-bottom: 25px;
      }

      > h5 {
        margin-bottom: 25px;
      }

      > button {
        width: 50%;
        @media ${(props) => props.theme.minimum} {
          width: 100%;
        }
        @media ${(props) => props.theme.mobile} {
          width: 100%;
        }
      }

      > img {
        width: 100%;
      }
    }
  }

  /* SECTION 2 */
  &#section2 {
    grid-template-columns: 100%;
    grid-template-rows: 20% 80%;
    justify-content: center;

    > h1 {
      background-color: red;
    }

    > div {
      background-color: blue;
    }
  }

  /* SECTION 3 */
  &#section3 {
    grid-template-columns: 66% 33%;
    grid-column-gap: 1%;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }

    > .gifWrap {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 60% 40%;
      padding: 20px;
      background-color: blueviolet;
      @media ${(props) => props.theme.minimum} {
        order: 1;
      }
      @media ${(props) => props.theme.mobile} {
        order: 1;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > #gif {
        padding: 20px;
        background-color: brown;
      }

      > #previewWrap {
        padding: 20px;
        background-color: coral;
      }
    }

    > .commentWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: darkblue;
    }
  }
  /* SECTION 4 */
  &#section4 {
    grid-template-columns: 33% 66%;
    grid-column-gap: 1%;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > .commentWrap {
      background-color: darkblue;
    }

    > .gifWrap {
      background-color: darkgray;
    }
  }
  /* SECTION 5 */
  &#section5 {
    grid-template-columns: 66% 33%;
    grid-column-gap: 1%;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > .commentWrap {
      background-color: darkblue;
      @media ${(props) => props.theme.minimum} {
        order: 1;
      }
      @media ${(props) => props.theme.mobile} {
        order: 1;
      }
    }

    > .gifWrap {
      background-color: darkgray;
      @media ${(props) => props.theme.minimum} {
        order: 2;
      }
      @media ${(props) => props.theme.mobile} {
        order: 2;
      }
    }
  }
  /* SECTION 6 */
  &#section6 {
    grid-template-columns: 33% 66%;
    grid-column-gap: 1%;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > .commentWrap {
      background-color: darkblue;
    }

    > .gifWrap {
      background-color: darkgray;
    }
  }
  /* SECTION 7 */
  &#section7 {
    display: flex;
    flex-direction: column;
    min-height: 400px;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      > h5 {
        margin-bottom: 25px;
      }

      > h1 {
        margin-bottom: 25px;
        > span {
          color: #ff71ce;
        }
        > .wordBreak {
          display: none;
          @media ${(props) => props.theme.minimum} {
            display: block;
          }
          @media ${(props) => props.theme.mobile} {
            display: block;
          }
        }
      }

      > button {
        width: 50%;
      }

      > img {
        width: 100%;
        @media ${(props) => props.theme.tablet} {
          width: 350px;
        }
        @media ${(props) => props.theme.desktop} {
          width: 500px;
        }
      }
    }
  }
`;

export default function Landing() {
  const history = useHistory();
  return (
    <LandingContainer theme={theme}>
      <SectionBox id="section1" theme={theme}>
        <div>
          <h1>
            칵테일 <br /> 어렵게만 느껴지셨나요?
          </h1>
          <h5>
            집에서도 만들 수 있는 <br />
            소맥만큼 쉬운 칵테일 레시피 <br />
            이제 혼술도 느낌있는 칵테일과 함께 <br />
          </h5>
          <button
            onClick={() => {
              history.push("/main");
            }}
          >
            레시피 보러가기
          </button>
        </div>
        <div>
          <img src="bartender4.png" alt="" className="landing-image"></img>
        </div>
      </SectionBox>

      <SectionBox id="section2" theme={theme}>
        <h1>섹션 2 멘트 title</h1>
        <div>슬라이드 Wrap</div>
      </SectionBox>

      <SectionBox id="section3" theme={theme}>
        <div className="gifWrap">
          <div id="gif">GIF</div>
          <div id="previewWrap">미리보기</div>
        </div>
        <div className="commentWrap">섹션3 멘트</div>
      </SectionBox>

      <SectionBox id="section4" theme={theme}>
        <div className="commentWrap">섹션4 멘트</div>
        <div className="gifWrap">GIF</div>
      </SectionBox>

      <SectionBox id="section5" theme={theme}>
        <div className="gifWrap">GIF</div>
        <div className="commentWrap">섹션5 멘트</div>
      </SectionBox>

      <SectionBox id="section6" theme={theme}>
        <div className="commentWrap">섹션6 멘트</div>
        <div className="gifWrap">GIF</div>
      </SectionBox>

      <SectionBox id="section7" theme={theme}>
        <div>
          <h5>간단한 레시피부터 정통 레시피, 그리고 논알콜까지</h5>
          <h1>
            이 세상
            <br className="wordBreak" /> 모든 칵테일이 <span>쓰까</span>지는 곳
            <br />
            <span>SSG-GA</span>
          </h1>
          <button
            onClick={() => {
              history.push("/main");
            }}
          >
            시작하기
          </button>
          <img src="bartender3.jpg" alt="" className="landing-image"></img>
        </div>
      </SectionBox>
    </LandingContainer>
  );
}

// 랜딩 페이지 입니다

{
  /* 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScroll,
  faThList,
  faCocktail,
} from "@fortawesome/free-solid-svg-icons";
import TopButton from "../components/TopButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

 &.section2 {
    align-items: center;
    justify-content: center;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    border: solid 4px;
    border-color: white;
    box-shadow: ${(props) => (props.backcolor ? props.backcolor : null)} 0px 0px
        15px,
      inset ${(props) => (props.backcolor ? props.backcolor : null)} 0px 0px
        15px;
  }


  <LandingSection className="landing-2">
<SectionBox className="section2" backcolor="#ff71ce">
  <div>
    <FontAwesomeIcon icon={faScroll} size="3x" color="#ff71ce" />
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
    <FontAwesomeIcon icon={faThList} size="3x" color="#76ff01" />
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
    <FontAwesomeIcon icon={faCocktail} size="3x" color="#fdf14f" />
  </div>
  <div className="text">
    <h2>나만의 썸네일</h2>
  </div>
  <div>
    <h5>색깔부터 재료까지</h5>
    <h5>쉽고 다양한 커스터마이징</h5>
  </div>
</SectionBox>
</LandingSection> */
}
