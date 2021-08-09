import axios from "axios";

export const requestList = async () => {
  try {
    const res = await axios.get(process.env.REACT_APP_END_POINT + "/article");

    if (res.status === 200) {
      return res.data.data;
    }
  } catch {
    return [];
  }
};
