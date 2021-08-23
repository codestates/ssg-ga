import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestList } from "../utils/requestList";
import styled from "styled-components";
import theme from "../style/theme";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import LandingSampleView from "../components/LandingSampleView";
import Color from "../components/Color";

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
    grid-template-rows: 12% 8% 80%;
    justify-content: center;
    align-items: center;

    .heading-en {
      position: relative;
      width: 100%;
      max-width: none;
      margin: 0 !important;
      padding: 0 0 10px;
      font-family: "Cinzel", serif;
      font-size: calc(2rem + 1.6vw) !important;
      font-weight: normal !important;
      text-transform: uppercase;
      line-height: 1 !important;
      letter-spacing: -0.01em;
      color: rgba(35, 48, 54, 0.1);
      overflow: hidden;
      white-space: nowrap;
    }
    .heading-en.scroll-effect span {
      width: 100%;
      height: 100%;
    }
    .heading-en span {
      position: absolute;
      display: block;
      width: 0;
      top: 0;
      left: 0;
      color: #9e9e9e;
      overflow: hidden;
      white-space: nowrap;
      transition: width 0.8s cubic-bezier(0.6, 0, 0.8, 1);
    }
    .heading-en:after,
    .heading-en span:after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 3px;
      margin: -0.5rem 0 0 2vw;
      vertical-align: middle;
      background-color: rgba(35, 48, 54, 0.1);
    }
    .heading-en span:after {
      background-color: #9e9e9e;
    }

    *,
    *:before,
    *:after {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    > h2 {
      /* background-color: red; */
    }
  }

  /* SECTION 3 */
  &#section3 {
    grid-template-columns: 66% 33%;
    grid-column-gap: 1%;
    width: 100%;
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
      width: 100%;
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
        width: 100%;
        background-color: brown;
        > img {
          width: 100%;
        }
      }

      > #previewWrap {
        display: grid;
        grid-template-columns: 15% 40% 55%;
        padding: 20px;
        background-color: coral;
        width: 100%;
        > div {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
        }
        > #previewThumbnail {
          width: 100%;
          display: flex;
          justify-content: center;
          > div {
            width: 100%;
          }
        }
      }
    }

    > .commentWrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: darkblue;
      > h5 {
        padding-top: 30px;
      }
    }
  }
  /* SECTION 4 */
  &#section4 {
    width: 100%;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      background-color: darkblue;
      > h5 {
        padding-top: 30px;
      }
    }

    > .gifWrap {
      width: 100%;
      background-color: darkgray;
      > img {
        width: 100%;
      }
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
  const [list, setList] = useState([]);

  useEffect(async () => {
    const listData = await requestList(0, { tag: "인기" });
    console.log(listData);
    setList(listData);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  const [index, setIndex] = useState(0);
  const previewTitle = ["원색", "그라데이션", "레이어"];
  const previewThumbnailData = [
    {
      thumbnail_type: "mono",
      thumbnail_color: [
        ["#71ff88"],
        [0],
        [
          {
            bubble: false,
            ice: false,
            inCupCherry: false,
            inCupLemonGreen: false,
            inCupLemonYellow: true,
          },
          {
            outCupCherry: false,
            outCupLemonGreen: true,
            outCupLemonYellow: false,
            stick: false,
            strawBent: false,
            strawGreen: false,
            strawRed: false,
            strawYellow: false,
            umbrellaGreen: false,
            umbrellaRed: false,
            umbrellaYellow: false,
          },
        ],
      ],
    },
    {
      thumbnail_type: "gradient",
      thumbnail_color: [
        ["#d7b449", "#a1140a"],
        [0, 100],
        [
          {
            bubble: false,
            ice: true,
            inCupCherry: false,
            inCupLemonGreen: false,
            inCupLemonYellow: false,
          },
          {
            outCupCherry: false,
            outCupLemonGreen: true,
            outCupLemonYellow: false,
            stick: false,
            strawBent: false,
            strawGreen: false,
            strawRed: true,
            strawYellow: false,
            umbrellaGreen: false,
            umbrellaRed: false,
            umbrellaYellow: false,
          },
        ],
      ],
    },
    {
      thumbnail_type: "layer",
      thumbnail_color: [
        ["#2a0001", "#87c643", "#fba419"],
        [24, 56],
        [
          {
            bubble: false,
            ice: false,
            inCupCherry: false,
            inCupLemonGreen: false,
            inCupLemonYellow: false,
          },
          {
            outCupCherry: false,
            outCupLemonGreen: false,
            outCupLemonYellow: false,
            stick: false,
            strawBent: false,
            strawGreen: false,
            strawRed: true,
            strawYellow: false,
            umbrellaGreen: false,
            umbrellaRed: false,
            umbrellaYellow: false,
          },
        ],
      ],
    },
  ];
  const handleSetIndex = (idx) => {
    setIndex(idx);
  };

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
        <p className="heading-en scroll-effect">
          <span className="heading-en scroll-effect">SHOW</span>
        </p>
        <h2>개성 넘치는 나만의 칵테일을 만들어보세요.</h2>
        <div>
          <Slider {...settings}>
            {list.length !== 0
              ? list.map((el) => {
                  return <LandingSampleView id={el.id} />;
                })
              : null}
          </Slider>
        </div>
      </SectionBox>

      <SectionBox id="section3" theme={theme}>
        <div className="gifWrap">
          <div id="gif">
            <img src="thumbnailPreview.gif" alt="" />
          </div>
          <div id="previewWrap">
            <div>
              미 <br />리 <br />보 <br />기
            </div>
            <div>
              {previewTitle.map((el, idx) => {
                return (
                  <div>
                    <span
                      onClick={() => {
                        handleSetIndex(idx);
                      }}
                    >
                      {el}
                    </span>
                  </div>
                );
              })}
            </div>
            <div id="previewThumbnail">
              <Color
                layerType={previewThumbnailData[index].thumbnail_type}
                color={previewThumbnailData[index].thumbnail_color[0]}
                pos={previewThumbnailData[index].thumbnail_color[1]}
                deco={previewThumbnailData[index].thumbnail_color[2]}
              />
            </div>
          </div>
        </div>
        <div className="commentWrap">
          <h2>개성 넘치는 썸네일을 만들어보세요.</h2>
          <h5>
            3 종류의 모양 중에서 원하는 타입을 선택해보세요. 다양한 색깔과
            위치를 설정해 썸네일을 꾸밀 수 있어요.
            <br />
            여기에 원하는 장식을 얹어주면 완성!
          </h5>
        </div>
      </SectionBox>

      <SectionBox id="section4" theme={theme}>
        <div className="commentWrap">
          <h2>인기 있는 레시피를 한 눈에</h2>
          <h5>
            ssg-ga 에서 레시피를 분류해드립니다. 유저들이 가장 많이 추천한
            레시피, 많이 사용한 해시태그와 재료까지.
            <br />
            원하는 레시피가 없다면 상단의 검색바를 이용해 직접 원하는 주제로
            검색해보세요.
          </h5>
        </div>
        <div className="gifWrap">
          <img src="categorizedList.gif" alt="" />
        </div>
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
