import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RecipeList from "../components/RecipeList";

export default function MyPage() {
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);
  const { id, username } = state.userData;
  const [query, setQuery] = useState({ published: id });
  const { image } = profile;
  console.log(image);

  const handleMyList = (type) => {
    setQuery({ [type]: id });
  };

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
    gap: 2em;
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

  const ImageWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid lime;

    width: 10rem;
    height: 10rem;

    border-radius: 50%;
    overflow: hidden;
  `;

  const MyArticleBtn = styled.span`
    cursor: pointer;
    display: flex;
  `;
  const LikeArticleBtn = styled.span`
    cursor: pointer;
    display: flex;
  `;

  return (
    <>
      <Container>
        <UserInfoBox>
          <ImageWrap>
            <Profile>
              <img src={image} width="200" height="200" />,
            </Profile>
          </ImageWrap>
          <div>
            <div>{username}님, 반갑습니다.</div>
            <Link to="/useredit">회원정보 수정</Link>
          </div>
        </UserInfoBox>
        <ArticleSelectArea>
          <MyArticleBtn onClick={() => handleMyList("published")}>
            내 게시글
          </MyArticleBtn>
          <LikeArticleBtn onClick={() => handleMyList("liked")}>
            내 관심글
          </LikeArticleBtn>
        </ArticleSelectArea>
        <ArticleArea>
          <RecipeList query={query} />
        </ArticleArea>
      </Container>
    </>
  );
}
