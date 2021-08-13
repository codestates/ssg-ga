"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("article", [
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#33B8FF", "#FE9208", "#FFFBF5"],
          [66, 80, 95],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([
          ["보드카", "25"],
          ["오렌지", "15"],
          ["블루 하와이", "175"],
        ]),
        like_user_id: JSON.stringify([1, 2, 5, 6, 7]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FEFCD6"], [0]]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([1, 2]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "툿시 롤",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#3F2308", "#FAF9E3"],
          [66, 88],
        ]),
        content:
          "초콜릿 보드카를 약간 따르고 그 위에 콜라를 마구마구 부어주세요",
        tag: JSON.stringify(["코카콜라술", "콜라아님"]),
        ingredient: JSON.stringify([
          ["초콜릿 보드카", "25"],
          ["코카콜라", "200"],
        ]),
        like_user_id: JSON.stringify([1, 2]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 4,
        title: "솔티 네오폴리탄",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#FB400E", "#FF8767"],
          [70, 85],
        ]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 5,
        title: "봉 워터",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#2A0001", "#87C643", "#F4A817"],
          [33, 66, 99],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["멜론", "오렌지"]),
        ingredient: JSON.stringify([
          ["오렌지주스", "50"],
          ["멜론 리큐어", "50"],
          ["예거마이스터", "50"],
        ]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 6,
        title: "더블와이드",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#EB7627", "#683821"],
          [85, 95],
        ]),
        content: "콜라 시럽에 잭 다니엘스를 부어 마십니다",
        tag: JSON.stringify(["콜라", "잭"]),
        ingredient: JSON.stringify([
          ["콜라 시럽", "30"],
          ["잭 다니엘스", "200"],
        ]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 7,
        title: "미라클 프라페",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#5F291F", "#03A665"],
          [66, 99],
        ]),
        content: "잘게 부순 얼음 위에 민트 크림을 얹고 브랑카를 넣어주세요",
        tag: JSON.stringify(["민트", "얼음"]),
        ingredient: JSON.stringify([
          ["민트 크림", "30"],
          ["브랑카", 200],
        ]),
        like_user_id: JSON.stringify([1, 4]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 8,
        title: "애플 소스",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FEF6E1", "#A6CE3A", "#FDED00"],
          [66, 80, 95],
        ]),
        content:
          "파인애플 주스에 신 맛이 나는 사과 퓨레를 올리고 라거를 채워줍니다.",
        tag: JSON.stringify(["신맛", "파인애플"]),
        ingredient: JSON.stringify([
          ["파인애플 주스", "30"],
          ["사과 퓨레", "25"],
          ["라거", "150"],
        ]),
        like_user_id: JSON.stringify([1, 4]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 9,
        title: "옥시콘틴",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#E2CFE3", "#F0E2E2", "#EFE50A", "#F8A517"],
          [33, 45, 80, 92],
        ]),
        content:
          "오렌지주스와 바카디, 사이다를 섞고 블랙베리 슈냅스를 위에 올려줍니다.",
        tag: JSON.stringify(["독한맛", "과일맛"]),
        ingredient: JSON.stringify([
          ["사이다", "50"],
          ["오렌지주스", "30"],
          ["바카디", "50"],
          ["블랙베리 슈냅스", "50"],
        ]),
        like_user_id: JSON.stringify([1, 4]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 10,
        title: "도스 미오 슈터",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FFECCE"], [0]]),
        content:
          "패트론 실버와 패트론 시트로나지를 섞고 오늘의 샤베트를 올려주세요.",
        tag: JSON.stringify(["샤베트", "데킬라"]),
        ingredient: JSON.stringify([
          ["데킬라", "150"],
          ["샤베트", "50"],
        ]),
        like_user_id: JSON.stringify([1]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "빌리스 밴딧",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FFF4E4", "#C8692F", "#9F0625"],
          [33, 66, 99],
        ]),
        content:
          "크렌베리 주스와 트리플 색, 서던 컴포트를 섞이지 않게 차례대로 넣어주세요.",
        tag: JSON.stringify(["과일주스"]),
        ingredient: JSON.stringify([
          ["크랜베리 주스", "75"],
          ["트리플 색", "75"],
          ["서던 컴포트", "75"],
        ]),
        like_user_id: JSON.stringify([1]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "바 에티켓",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECEAF7", "#F9ED87"],
          [66, 77],
        ]),
        content:
          "홈메이드 사워믹스와 보트카, 릴렛 블랑을 섞고 액체 질소로 마무리",
        tag: JSON.stringify(["액체질소", "신맛"]),
        ingredient: JSON.stringify([
          ["릴렛 블랑", "50"],
          ["홈메이드 사워믹스", "50"],
          ["베리 보드카", "100"],
          ["액체 질소", "10"],
        ]),
        like_user_id: JSON.stringify([1]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "앨러배마 슬래머",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FBA419", "#C8692F", "#B95734", "#A91D20"],
          [25, 50, 75, 100],
        ]),
        content:
          "진, 아마레토, 서던 컴포트, 오렌지 주스를 섞이지 않도록 차례대로 넣어 만들면 됩니다.",
        tag: JSON.stringify(["과일맛이지만", "도수는 높을꺼야"]),
        ingredient: JSON.stringify([
          ["진", "50"],
          ["아마레토", "50"],
          ["서던 컴포트", "50"],
          ["오렌지 주스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "생일 케이크",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECB86F", "#FEF1BC"],
          [75, 95],
        ]),
        content:
          "시트러스 향이 나는 보드카와 프란젤리코를 섞어주고 레몬 설탕을 토핑으로 뿌려줍니다.",
        tag: JSON.stringify(["생일", "초도 꽂아주세요"]),
        ingredient: JSON.stringify([
          ["보드카", "100"],
          ["프란젤리코", "100"],
          ["레몬 설탕", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "핫 로드",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#F34A2D"], [0]]),
        content: "토바스코 소스와 라임 주스, 밀라그로 실버를 섞어줍니다.",
        tag: JSON.stringify(["왜 굳이 소스를", "심지어 비싸"]),
        ingredient: JSON.stringify([
          ["토바스코 소스", "80"],
          ["라임주스", "60"],
          ["밀라그로 실버", "60"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "킥킹 뮬",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#E6F0D5"], [0]]),
        content: "진저비어 와 보드카를 섞고 라임을 꽂아 장식하면 완성!",
        tag: JSON.stringify(["보드카맛", "조금 비싸요"]),
        ingredient: JSON.stringify([
          ["진저 비어", "150"],
          ["보드카", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 4,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#33B8FF", "#FE9208", "#FFFBF5"],
          [66, 80, 95],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([
          ["보드카", "25"],
          ["오렌지", "15"],
          ["블루 하와이", "175"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 4,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FEFCD6"], [0]]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 5,
        title: "툿시 롤",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#3F2308", "#FAF9E3"],
          [66, 88],
        ]),
        content:
          "초콜릿 보드카를 약간 따르고 그 위에 콜라를 마구마구 부어주세요",
        tag: JSON.stringify(["코카콜라술", "콜라아님"]),
        ingredient: JSON.stringify([
          ["초콜릿 보드카", "25"],
          ["코카콜라", "200"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 5,
        title: "솔티 네오폴리탄",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#FB400E", "#FF8767"],
          [70, 85],
        ]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 6,
        title: "봉 워터",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#2A0001", "#87C643", "#F4A817"],
          [33, 66, 99],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["멜론", "오렌지"]),
        ingredient: JSON.stringify([
          ["오렌지주스", "50"],
          ["멜론 리큐어", "50"],
          ["예거마이스터", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 6,
        title: "더블와이드",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#EB7627", "#683821"],
          [85, 95],
        ]),
        content: "콜라 시럽에 잭 다니엘스를 부어 마십니다",
        tag: JSON.stringify(["콜라", "잭"]),
        ingredient: JSON.stringify([
          ["콜라 시럽", "30"],
          ["잭 다니엘스", "200"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 7,
        title: "미라클 프라페",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#5F291F", "#03A665"],
          [66, 99],
        ]),
        content: "잘게 부순 얼음 위에 민트 크림을 얹고 브랑카를 넣어주세요",
        tag: JSON.stringify(["민트", "얼음"]),
        ingredient: JSON.stringify([
          ["민트 크림", "30"],
          ["브랑카", 200],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 7,
        title: "애플 소스",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FEF6E1", "#A6CE3A", "#FDED00"],
          [66, 80, 95],
        ]),
        content:
          "파인애플 주스에 신 맛이 나는 사과 퓨레를 올리고 라거를 채워줍니다.",
        tag: JSON.stringify(["신맛", "파인애플"]),
        ingredient: JSON.stringify([
          ["파인애플 주스", "30"],
          ["사과 퓨레", "25"],
          ["라거", "150"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 8,
        title: "옥시콘틴",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#E2CFE3", "#F0E2E2", "#EFE50A", "#F8A517"],
          [33, 45, 80, 92],
        ]),
        content:
          "오렌지주스와 바카디, 사이다를 섞고 블랙베리 슈냅스를 위에 올려줍니다.",
        tag: JSON.stringify(["독한맛", "과일맛"]),
        ingredient: JSON.stringify([
          ["사이다", "50"],
          ["오렌지주스", "30"],
          ["바카디", "50"],
          ["블랙베리 슈냅스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 8,
        title: "도스 미오 슈터",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FFECCE"], [0]]),
        content:
          "패트론 실버와 패트론 시트로나지를 섞고 오늘의 샤베트를 올려주세요.",
        tag: JSON.stringify(["샤베트", "데킬라"]),
        ingredient: JSON.stringify([
          ["데킬라", "150"],
          ["샤베트", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 9,
        title: "빌리스 밴딧",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FFF4E4", "#C8692F", "#9F0625"],
          [33, 66, 99],
        ]),
        content:
          "크렌베리 주스와 트리플 색, 서던 컴포트를 섞이지 않게 차례대로 넣어주세요.",
        tag: JSON.stringify(["과일주스"]),
        ingredient: JSON.stringify([
          ["크랜베리 주스", "75"],
          ["트리플 색", "75"],
          ["서던 컴포트", "75"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 9,
        title: "바 에티켓",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECEAF7", "#F9ED87"],
          [66, 77],
        ]),
        content:
          "홈메이드 사워믹스와 보트카, 릴렛 블랑을 섞고 액체 질소로 마무리",
        tag: JSON.stringify(["액체질소", "신맛"]),
        ingredient: JSON.stringify([
          ["릴렛 블랑", "50"],
          ["홈메이드 사워믹스", "50"],
          ["베리 보드카", "100"],
          ["액체 질소", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 10,
        title: "앨러배마 슬래머",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FBA419", "#C8692F", "#B95734", "#A91D20"],
          [25, 50, 75, 100],
        ]),
        content:
          "진, 아마레토, 서던 컴포트, 오렌지 주스를 섞이지 않도록 차례대로 넣어 만들면 됩니다.",
        tag: JSON.stringify(["과일맛이지만", "도수는 높을꺼야"]),
        ingredient: JSON.stringify([
          ["진", "50"],
          ["아마레토", "50"],
          ["서던 컴포트", "50"],
          ["오렌지 주스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 10,
        title: "생일 케이크",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECB86F", "#FEF1BC"],
          [75, 95],
        ]),
        content:
          "시트러스 향이 나는 보드카와 프란젤리코를 섞어주고 레몬 설탕을 토핑으로 뿌려줍니다.",
        tag: JSON.stringify(["생일", "초도 꽂아주세요"]),
        ingredient: JSON.stringify([
          ["보드카", "100"],
          ["프란젤리코", "100"],
          ["레몬 설탕", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "핫 로드",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#F34A2D"], [0]]),
        content: "토바스코 소스와 라임 주스, 밀라그로 실버를 섞어줍니다.",
        tag: JSON.stringify(["왜 굳이 소스를", "심지어 비싸"]),
        ingredient: JSON.stringify([
          ["토바스코 소스", "80"],
          ["라임주스", "60"],
          ["밀라그로 실버", "60"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "킥킹 뮬",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#E6F0D5"], [0]]),
        content: "진저비어 와 보드카를 섞고 라임을 꽂아 장식하면 완성!",
        tag: JSON.stringify(["보드카맛", "조금 비싸요"]),
        ingredient: JSON.stringify([
          ["진저 비어", "150"],
          ["보드카", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#33B8FF", "#FE9208", "#FFFBF5"],
          [66, 80, 95],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([
          ["보드카", "25"],
          ["오렌지", "15"],
          ["블루 하와이", "175"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FEFCD6"], [0]]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "툿시 롤",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#3F2308", "#FAF9E3"],
          [66, 88],
        ]),
        content:
          "초콜릿 보드카를 약간 따르고 그 위에 콜라를 마구마구 부어주세요",
        tag: JSON.stringify(["코카콜라술", "콜라아님"]),
        ingredient: JSON.stringify([
          ["초콜릿 보드카", "25"],
          ["코카콜라", "200"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "솔티 네오폴리탄",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#FB400E", "#FF8767"],
          [70, 85],
        ]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "봉 워터",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#2A0001", "#87C643", "#F4A817"],
          [33, 66, 99],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["멜론", "오렌지"]),
        ingredient: JSON.stringify([
          ["오렌지주스", "50"],
          ["멜론 리큐어", "50"],
          ["예거마이스터", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "더블와이드",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#EB7627", "#683821"],
          [85, 95],
        ]),
        content: "콜라 시럽에 잭 다니엘스를 부어 마십니다",
        tag: JSON.stringify(["콜라", "잭"]),
        ingredient: JSON.stringify([
          ["콜라 시럽", "30"],
          ["잭 다니엘스", "200"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "미라클 프라페",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#5F291F", "#03A665"],
          [66, 99],
        ]),
        content: "잘게 부순 얼음 위에 민트 크림을 얹고 브랑카를 넣어주세요",
        tag: JSON.stringify(["민트", "얼음"]),
        ingredient: JSON.stringify([
          ["민트 크림", "30"],
          ["브랑카", 200],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "애플 소스",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FEF6E1", "#A6CE3A", "#FDED00"],
          [66, 80, 95],
        ]),
        content:
          "파인애플 주스에 신 맛이 나는 사과 퓨레를 올리고 라거를 채워줍니다.",
        tag: JSON.stringify(["신맛", "파인애플"]),
        ingredient: JSON.stringify([
          ["파인애플 주스", "30"],
          ["사과 퓨레", "25"],
          ["라거", "150"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "옥시콘틴",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#E2CFE3", "#F0E2E2", "#EFE50A", "#F8A517"],
          [33, 45, 80, 92],
        ]),
        content:
          "오렌지주스와 바카디, 사이다를 섞고 블랙베리 슈냅스를 위에 올려줍니다.",
        tag: JSON.stringify(["독한맛", "과일맛"]),
        ingredient: JSON.stringify([
          ["사이다", "50"],
          ["오렌지주스", "30"],
          ["바카디", "50"],
          ["블랙베리 슈냅스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "도스 미오 슈터",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FFECCE"], [0]]),
        content:
          "패트론 실버와 패트론 시트로나지를 섞고 오늘의 샤베트를 올려주세요.",
        tag: JSON.stringify(["샤베트", "데킬라"]),
        ingredient: JSON.stringify([
          ["데킬라", "150"],
          ["샤베트", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "빌리스 밴딧",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FFF4E4", "#C8692F", "#9F0625"],
          [33, 66, 99],
        ]),
        content:
          "크렌베리 주스와 트리플 색, 서던 컴포트를 섞이지 않게 차례대로 넣어주세요.",
        tag: JSON.stringify(["과일주스"]),
        ingredient: JSON.stringify([
          ["크랜베리 주스", "75"],
          ["트리플 색", "75"],
          ["서던 컴포트", "75"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "바 에티켓",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECEAF7", "#F9ED87"],
          [66, 77],
        ]),
        content:
          "홈메이드 사워믹스와 보트카, 릴렛 블랑을 섞고 액체 질소로 마무리",
        tag: JSON.stringify(["액체질소", "신맛"]),
        ingredient: JSON.stringify([
          ["릴렛 블랑", "50"],
          ["홈메이드 사워믹스", "50"],
          ["베리 보드카", "100"],
          ["액체 질소", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "앨러배마 슬래머",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FBA419", "#C8692F", "#B95734", "#A91D20"],
          [25, 50, 75, 100],
        ]),
        content:
          "진, 아마레토, 서던 컴포트, 오렌지 주스를 섞이지 않도록 차례대로 넣어 만들면 됩니다.",
        tag: JSON.stringify(["과일맛이지만", "도수는 높을꺼야"]),
        ingredient: JSON.stringify([
          ["진", "50"],
          ["아마레토", "50"],
          ["서던 컴포트", "50"],
          ["오렌지 주스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "생일 케이크",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECB86F", "#FEF1BC"],
          [75, 95],
        ]),
        content:
          "시트러스 향이 나는 보드카와 프란젤리코를 섞어주고 레몬 설탕을 토핑으로 뿌려줍니다.",
        tag: JSON.stringify(["생일", "초도 꽂아주세요"]),
        ingredient: JSON.stringify([
          ["보드카", "100"],
          ["프란젤리코", "100"],
          ["레몬 설탕", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "핫 로드",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#F34A2D"], [0]]),
        content: "토바스코 소스와 라임 주스, 밀라그로 실버를 섞어줍니다.",
        tag: JSON.stringify(["왜 굳이 소스를", "심지어 비싸"]),
        ingredient: JSON.stringify([
          ["토바스코 소스", "80"],
          ["라임주스", "60"],
          ["밀라그로 실버", "60"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "킥킹 뮬",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#E6F0D5"], [0]]),
        content: "진저비어 와 보드카를 섞고 라임을 꽂아 장식하면 완성!",
        tag: JSON.stringify(["보드카맛", "조금 비싸요"]),
        ingredient: JSON.stringify([
          ["진저 비어", "150"],
          ["보드카", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#33B8FF", "#FE9208", "#FFFBF5"],
          [66, 80, 95],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([
          ["보드카", "25"],
          ["오렌지", "15"],
          ["블루 하와이", "175"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FEFCD6"], [0]]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "툿시 롤",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#3F2308", "#FAF9E3"],
          [66, 88],
        ]),
        content:
          "초콜릿 보드카를 약간 따르고 그 위에 콜라를 마구마구 부어주세요",
        tag: JSON.stringify(["코카콜라술", "콜라아님"]),
        ingredient: JSON.stringify([
          ["초콜릿 보드카", "25"],
          ["코카콜라", "200"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "솔티 네오폴리탄",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#FB400E", "#FF8767"],
          [70, 85],
        ]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([
          ["바나나 리큐어", "250"],
          ["바나나 푸딩", "20"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "봉 워터",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#2A0001", "#87C643", "#F4A817"],
          [33, 66, 99],
        ]),
        content:
          "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["멜론", "오렌지"]),
        ingredient: JSON.stringify([
          ["오렌지주스", "50"],
          ["멜론 리큐어", "50"],
          ["예거마이스터", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "더블와이드",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#EB7627", "#683821"],
          [85, 95],
        ]),
        content: "콜라 시럽에 잭 다니엘스를 부어 마십니다",
        tag: JSON.stringify(["콜라", "잭"]),
        ingredient: JSON.stringify([
          ["콜라 시럽", "30"],
          ["잭 다니엘스", "200"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "미라클 프라페",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#5F291F", "#03A665"],
          [66, 99],
        ]),
        content: "잘게 부순 얼음 위에 민트 크림을 얹고 브랑카를 넣어주세요",
        tag: JSON.stringify(["민트", "얼음"]),
        ingredient: JSON.stringify([
          ["민트 크림", "30"],
          ["브랑카", 200],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "애플 소스",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FEF6E1", "#A6CE3A", "#FDED00"],
          [66, 80, 95],
        ]),
        content:
          "파인애플 주스에 신 맛이 나는 사과 퓨레를 올리고 라거를 채워줍니다.",
        tag: JSON.stringify(["신맛", "파인애플"]),
        ingredient: JSON.stringify([
          ["파인애플 주스", "30"],
          ["사과 퓨레", "25"],
          ["라거", "150"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "옥시콘틴",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#E2CFE3", "#F0E2E2", "#EFE50A", "#F8A517"],
          [33, 45, 80, 92],
        ]),
        content:
          "오렌지주스와 바카디, 사이다를 섞고 블랙베리 슈냅스를 위에 올려줍니다.",
        tag: JSON.stringify(["독한맛", "과일맛"]),
        ingredient: JSON.stringify([
          ["사이다", "50"],
          ["오렌지주스", "30"],
          ["바카디", "50"],
          ["블랙베리 슈냅스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 2,
        title: "도스 미오 슈터",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#FFECCE"], [0]]),
        content:
          "패트론 실버와 패트론 시트로나지를 섞고 오늘의 샤베트를 올려주세요.",
        tag: JSON.stringify(["샤베트", "데킬라"]),
        ingredient: JSON.stringify([
          ["데킬라", "150"],
          ["샤베트", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "빌리스 밴딧",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FFF4E4", "#C8692F", "#9F0625"],
          [33, 66, 99],
        ]),
        content:
          "크렌베리 주스와 트리플 색, 서던 컴포트를 섞이지 않게 차례대로 넣어주세요.",
        tag: JSON.stringify(["과일주스"]),
        ingredient: JSON.stringify([
          ["크랜베리 주스", "75"],
          ["트리플 색", "75"],
          ["서던 컴포트", "75"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 3,
        title: "바 에티켓",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECEAF7", "#F9ED87"],
          [66, 77],
        ]),
        content:
          "홈메이드 사워믹스와 보트카, 릴렛 블랑을 섞고 액체 질소로 마무리",
        tag: JSON.stringify(["액체질소", "신맛"]),
        ingredient: JSON.stringify([
          ["릴렛 블랑", "50"],
          ["홈메이드 사워믹스", "50"],
          ["베리 보드카", "100"],
          ["액체 질소", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "앨러배마 슬래머",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify([
          ["#FBA419", "#C8692F", "#B95734", "#A91D20"],
          [25, 50, 75, 100],
        ]),
        content:
          "진, 아마레토, 서던 컴포트, 오렌지 주스를 섞이지 않도록 차례대로 넣어 만들면 됩니다.",
        tag: JSON.stringify(["과일맛이지만", "도수는 높을꺼야"]),
        ingredient: JSON.stringify([
          ["진", "50"],
          ["아마레토", "50"],
          ["서던 컴포트", "50"],
          ["오렌지 주스", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "생일 케이크",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify([
          ["#ECB86F", "#FEF1BC"],
          [75, 95],
        ]),
        content:
          "시트러스 향이 나는 보드카와 프란젤리코를 섞어주고 레몬 설탕을 토핑으로 뿌려줍니다.",
        tag: JSON.stringify(["생일", "초도 꽂아주세요"]),
        ingredient: JSON.stringify([
          ["보드카", "100"],
          ["프란젤리코", "100"],
          ["레몬 설탕", "10"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "핫 로드",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#F34A2D"], [0]]),
        content: "토바스코 소스와 라임 주스, 밀라그로 실버를 섞어줍니다.",
        tag: JSON.stringify(["왜 굳이 소스를", "심지어 비싸"]),
        ingredient: JSON.stringify([
          ["토바스코 소스", "80"],
          ["라임주스", "60"],
          ["밀라그로 실버", "60"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        author_id: 1,
        title: "킥킹 뮬",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify([["#E6F0D5"], [0]]),
        content: "진저비어 와 보드카를 섞고 라임을 꽂아 장식하면 완성!",
        tag: JSON.stringify(["보드카맛", "조금 비싸요"]),
        ingredient: JSON.stringify([
          ["진저 비어", "150"],
          ["보드카", "50"],
        ]),
        like_user_id: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("article", null, {});
  },
};
