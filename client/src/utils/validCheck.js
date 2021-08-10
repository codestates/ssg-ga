// 유효성 검사 함수
export const validCheckEmail = (email) => {
  const emailExp =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return emailExp.test(email) ? true : false;
};

export const validCheckUsername = (username) => {
  const usernameExp = /^[A-Za-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{4,8}$/; //  4 ~ 8자 영문,한글,숫자 조합
  return usernameExp.test(username) ? true : false;
};
export const validCheckPassword = (password) => {
  const passwordExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,10}$/; //  6 ~ 10자 영문, 숫자 조합
  return passwordExp.test(password) ? true : false;
};
export const validCheckDuplicatePassword = (password, confirmPassword) => {
  return password === confirmPassword ? true : false;
};
