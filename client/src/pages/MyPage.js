import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function MyPage() {
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);
  const { username } = state.userData;
  const { image } = profile;
  console.log(image);

  return (
    <>
      <Container>
        <UserInfoBox>
          <Profile>{image}</Profile>
          <div>{username}님,</div>
          <div>반갑습니다.</div>
          <Link>회원 정보 수정</Link>
        </UserInfoBox>
        <ArticleSelectArea>
          <div>내 게시글</div>
          <div>내 관심글</div>
        </ArticleSelectArea>
        <ArticleArea></ArticleArea>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleSelectArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
