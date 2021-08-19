"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        username: "얀콘팬",
        email: "hwang@gmail.com",
        password: `$2b$05$I6iRwOSQLK4.d42V.0/mo.PwcTdn2dQq4bwxka6PCzsBN2Y.8iwBK`,
        image: null,
        liked: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
        social: null,
      },
      {
        username: "shaker",
        email: "kim@gmail.com",
        password: `$2b$05$7Wdf3vvLZjiaOEkbRSQTquH27f/0JtlXHu5RudeoJiOJJ9.uQj1f.`,
        image: null,
        liked: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
        social: null,
      },
      {
        username: "쓰까사장",
        email: "no@gmail.com",
        password: `$2b$05$OrPUyKUM4.H2Vx7rfw8FsugRJ8yeEGh/7KZf1vkX1fwYDN2Cy6pmK`,
        image: null,
        liked: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
        social: null,
      },
      {
        username: "칵테일초보",
        email: "lee@gmail.com",
        password: `$2b$05$Sx5mnpIVejVabYEqqZHhq.rbzAZd/iyYYnvAt471.gQ0kkugRaoAm`,
        image: null,
        liked: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
        social: null,
      },
      {
        username: "혼술매니아",
        email: "test1@gmail.com",
        password: `$2b$05$pGzfGXKLTH/sVkC8hqlv2OE2wxR2DyhBp4nqTwOLXSkrc/ZFoAW7a`,
        image: null,
        liked: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
        social: null,
      },
      {
        username: "홈술시작했어요",
        email: "test2@gmail.com",
        password: `$2b$05$2wuw/Km/IoInAJPf7vudP.3tbNIAlcYDxA5qrVzQDUd7mRTcydzZi`,
        image: null,
        liked: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date(),
        social: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
