import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import UserEdit from "./UserEdit";

export default function MyPage() {
  const history = useHistory();
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);
  const { id, username } = state.userData;
  const [query, setQuery] = useState({ published: id });
  const { image } = profile;
  console.log(image);

  const handleMyList = (type) => {
    setQuery({ [type]: 1 });
  };

  return (
    <>
      <Container>
        <UserInfoBox>
          <Profile>{image}</Profile>
          <div>
            <div>{username}님, 반갑습니다.</div>
            <Link to="/useredit">회원정보 수정</Link>
          </div>
        </UserInfoBox>
        <ArticleSelectArea>
          <span onClick={() => handleMyList("published")}>내 게시글</span>
          <span onClick={() => handleMyList("liked")}>내 관심글</span>
        </ArticleSelectArea>
        <ArticleArea>
          <RecipeList query={query} />
        </ArticleArea>
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
  flex-direction: row;
  justify-content: center;
`;

const ArticleSelectArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
