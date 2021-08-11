'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('article', [
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 2,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "툿시 롤",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify(["#3F2308", "#FAF9E3"]),
        content: "초콜릿 보드카를 약간 따르고 그 위에 콜라를 마구마구 부어주세요",
        tag: JSON.stringify(["코카콜라술", "콜라아님"]),
        ingredient: JSON.stringify([["초콜릿 보드카", "25"], ["코카콜라", "200"]]),
        like_user_id: JSON.stringify([1, 2]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 3,
        title: "솔티 네오폴리탄",
        thumbnail_type: "gradient",
        thumbnail_color: JSON.stringify(["#FB400E", "#FF8767"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4, 7, 9]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4, 7, 9]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4, 7, 9]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4, 7, 9]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4, 7, 9]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "하와이안 펀치",
        thumbnail_type: "layer",
        thumbnail_color: JSON.stringify(["#33B8FF", "#FE9208", "##FFFBF5"]),
        content: "보드카를 제일 아래에 따르고 오렌지를 그 위에 올린 후 블루 하와이를 마지막으로 따라줍니다.",
        tag: JSON.stringify(["하와이감성", "가성비"]),
        ingredient: JSON.stringify([["보드카", "25"], ["오렌지", "15"], ["블루 하와이", "175"]]),
        like_user_id: JSON.stringify([1, 2, 4, 7, 9]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        title: "푸딩 샷",
        thumbnail_type: "mono",
        thumbnail_color: JSON.stringify(["#FEFCD6"]),
        content: "바나나 리큐어를 깔고 위에 바나나 푸딩을 얹어주세요",
        tag: JSON.stringify(["노랑노랑", "바나나"]),
        ingredient: JSON.stringify([["바나나 리큐어", "250"], ["바나나 푸딩", "20"]]),
        like_user_id: JSON.stringify([1, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('article', null, {});
  }
};
