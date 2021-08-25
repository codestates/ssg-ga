import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../style/theme";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";
import Color from "../components/Color";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageInit } from "../actions";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  word-break: keep-all;
  overflow: hidden;

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

  h3 {
    @media ${(props) => props.theme.minimum} {
      font-size: 16px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 16px;
    }
    @media ${(props) => props.theme.tablet} {
      font-size: 20px;
    }
    @media ${(props) => props.theme.desktop} {
      font-size: 30px;
    }
  }

  h5 {
    font-family: "Nanum Gothic", sans-serif;
    line-height: 30px;
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
  > .gifWrap {
    display: flex;
    width: 100%;
    @media ${(props) => props.theme.minimum} {
      order: 1;
    }
    @media ${(props) => props.theme.mobile} {
      order: 1;
    }
    > img {
      width: 100%;
      border-radius: 20px;
      box-shadow: 5px 7px 9px rgba(0, 0, 0, 0.2);
    }
    > video {
      width: 100%;
      border-radius: 20px;
      box-shadow: 5px 7px 9px rgba(0, 0, 0, 0.2);
    }
  }

  > .commentWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > h2 {
      width: 100%;
    }
    > h5 {
      width: 100%;
      padding-top: 30px;
    }
    > .desktopComment {
      display: block;
      @media ${(props) => props.theme.minimum} {
        display: none;
      }
      @media ${(props) => props.theme.mobile} {
        display: none;
      }
    }
    > .mobileComment {
      display: block;
      @media ${(props) => props.theme.tablet} {
        display: none;
      }
      @media ${(props) => props.theme.desktop} {
        display: none;
      }
    }
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
    align-items: center;
    border-radius: 20px;

    *,
    *:before,
    *:after {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    > div {
      > .slick-slider {
        > .slick-list {
          padding: 20px 0px;
        }
        > button {
          z-index: 1;
          -webkit-transform-style: preserve-3d;
          -webkit-transform: translateZ(5px);
          @media ${(props) => props.theme.minimum} {
            &.slick-prev {
              left: 0;
            }
            &.slick-next {
              right: 0;
            }
          }
          @media ${(props) => props.theme.mobile} {
            &.slick-prev {
              left: 0;
            }
            &.slick-next {
              right: 0;
            }
          }
        }
      }
    }

    > h2 {
      text-align: center;
    }
  }

  /* SECTION 3 */
  &#section3 {
    padding: 20px;
    border-radius: 20px;
    min-height: 650px;
    margin: 75px 0;
    grid-template-columns: 66% 33%;
    grid-column-gap: 1%;
    width: 100%;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.tablet} {
      min-height: 450px;
    }

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > .commentWrap {
      text-align: right;
      @media ${(props) => props.theme.minimum} {
        text-align: center;
      }
      @media ${(props) => props.theme.mobile} {
        text-align: center;
      }
    }
  }

  /* SECTION 4 */
  &#section4 {
    width: 100%;
    grid-template-columns: 33% 66%;
    grid-column-gap: 1%;
    padding: 20px;
    border-radius: 20px;
    min-height: 650px;
    margin: 75px 0;
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: 100%;
    }
    @media ${(props) => props.theme.tablet} {
      min-height: 450px;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > .commentWrap {
      text-align: left;
      @media ${(props) => props.theme.minimum} {
        text-align: center;
      }
      @media ${(props) => props.theme.mobile} {
        text-align: center;
      }
      > h5 {
        padding-top: 30px;
      }
    }

    > .gifWrap {
      width: 100%;
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
    @media ${(props) => props.theme.tablet} {
      min-height: 450px;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > .commentWrap {
      text-align: right;
      @media ${(props) => props.theme.minimum} {
        text-align: center;
      }
      @media ${(props) => props.theme.mobile} {
        text-align: center;
      }
      > h5 {
        > .wordBreak {
          display: none;
          @media ${(props) => props.theme.tablet} {
            display: block;
          }
        }
      }
    }

    > .gifWrap {
      @media ${(props) => props.theme.minimum} {
        order: 1;
      }
      @media ${(props) => props.theme.mobile} {
        order: 1;
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
    @media ${(props) => props.theme.tablet} {
      min-height: 450px;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > .commentWrap {
      text-align: left;
      @media ${(props) => props.theme.minimum} {
        text-align: center;
      }
      @media ${(props) => props.theme.mobile} {
        text-align: center;
      }
    }

    > .gifWrap {
      display: flex;
      width: 100%;
      > img {
        width: 100%;
        box-shadow: none;
      }
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

      > h5,
      h1 {
        margin-bottom: 25px;
        > .wordBreak {
          display: none;
          @media ${(props) => props.theme.minimum} {
            display: block;
          }
          @media ${(props) => props.theme.mobile} {
            display: block;
          }
        }
        > span {
          color: #ff71ce;
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
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(setPageInit());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 700,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
    {
      thumbnail_type: "mono",
      thumbnail_color: [
        ["#ffd733"],
        [0],
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
            strawGreen: true,
            strawRed: false,
            strawYellow: false,
            umbrellaGreen: false,
            umbrellaRed: false,
            umbrellaYellow: false,
          },
        ],
      ],
    },
  ];

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
        <h2>정통 몰디브 모히또부터</h2>
        <div>
          <Slider {...settings}>
            {previewThumbnailData.map((el, index) => {
              return (
                <Color
                  key={"landing" + index}
                  layerType={el.thumbnail_type}
                  color={el.thumbnail_color[0]}
                  pos={el.thumbnail_color[1]}
                  deco={el.thumbnail_color[2]}
                />
              );
            })}
          </Slider>
        </div>
        <h2>편의점 밀키네이드까지</h2>
      </SectionBox>

      <SectionBox
        id="section3"
        theme={theme}
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <div className="gifWrap">
          <video autoPlay loop muted playsInline>
            <source src="thumbnailModify.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="commentWrap">
          <h2>개성 넘치는 썸네일을 만들어보세요.</h2>
          <h5>
            3 종류의 모양 중에서
            <br /> 원하는 타입을 선택해보세요.
            <br /> 다양한 색깔과 위치를 설정해
            <br /> 썸네일을 꾸밀 수 있어요.
            <br />
            여기에 원하는 장식을 얹어주면 완성!
          </h5>
        </div>
      </SectionBox>

      <SectionBox
        id="section4"
        theme={theme}
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <div className="commentWrap">
          <h2>
            인기 있는 레시피를 <br />한 눈에
          </h2>
          <h5>
            ssg-ga 에서 레시피를 분류해드립니다.
            <br /> 유저들이 가장 많이 추천한 레시피,
            <br /> 많이 사용한 해시태그와 재료까지.
            <br />
            원하는 레시피가 없다면 상단의 검색바를 이용해 직접 원하는 주제로
            검색해보세요.
          </h5>
        </div>
        <div className="gifWrap">
          <video autoPlay loop muted playsInline>
            <source src="categorizedList.mp4" type="video/mp4" />
          </video>
        </div>
      </SectionBox>

      <SectionBox
        id="section5"
        theme={theme}
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <div className="gifWrap">
          <video autoPlay loop muted playsInline>
            <source src="likeCount.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="commentWrap">
          <h2>
            하트를 눌러 <br />
            레시피를 모아보세요!
          </h2>
          <h5>
            마음에 드는 레시피에&nbsp;
            <br className="wordBreak" />
            하트를 누르면
            <br />
            작성한 레시피와&nbsp;
            <br className="wordBreak" />
            하트를 누른 레시피를&nbsp;
            <br className="wordBreak" />
            마이페이지에서 만날 수 있어요.
          </h5>
        </div>
      </SectionBox>

      <SectionBox
        id="section6"
        theme={theme}
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <div className="commentWrap">
          <h2 className="desktopComment">
            모바일에서도 <br />
            경험 할 수 있어요!
          </h2>
          <h2 className="mobileComment">
            컴퓨터에서도 <br />
            경험 할 수 있어요!
          </h2>
          <h5>
            데스크탑, 태블릿, 모바일
            <br />
            어디서나 원하는 기기로
            <br />
            사이트를 이용해보세요.
          </h5>
        </div>
        <div className="gifWrap">
          <img src="responsive.png" alt="반응형 예시" />
        </div>
      </SectionBox>

      <SectionBox id="section7" theme={theme}>
        <div>
          <h5>
            간단한 레시피부터 정통 레시피,&nbsp;
            <br className="wordBreak" />
            그리고 논알콜까지
          </h5>
          <h1>
            이 세상
            <br className="wordBreak" /> 모든 칵테일이 <span>쓰까</span>지는 곳
            <br />
            <span>
              <div data-aos="zoom-out" data-aos-duration="1500">
                SSG-GA
              </div>
            </span>
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
