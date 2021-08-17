// 유효성 검사 함수
export const validCheckEmail = (email) => {
  const emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/i;
  return emailExp.test(email) ? true : false;
};

export const validCheckUsername = (username) => {
  const usernameExp = /^[A-Za-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,10}$/; //  3 ~ 10자 영문,한글,숫자 조합
  return usernameExp.test(username) ? true : false;
};
export const validCheckPassword = (password) => {
  const passwordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,10}$/; //  6 ~ 10자 영문, 숫자 조합
  return passwordExp.test(password) ? true : false;
};
export const validCheckDuplicatePassword = (password, confirmPassword) => {
  return password === confirmPassword ? true : false;
};
