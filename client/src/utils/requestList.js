import axios from "axios";

export const requestList = async (count = 0, query = {}) => {
  const queryVar = Object.keys(query)[0];
  const queryString =
    queryVar !== undefined ? `&type=${queryVar}&value=${query[queryVar]}` : ``;
  try {
    const res = await axios.get(
      process.env.REACT_APP_END_POINT +
        "/article?" +
        `count=${count}` +
        queryString
    );

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    return [];
  }
};
/*
type : tag
value : tag name

type : ingredient
value : ingredient name

type : liked
value : user_id

type : published
value : user_id

type : count(?) << 쿼리명 정할필요있음
value : auto

*/
