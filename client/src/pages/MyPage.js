import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import RecipeList from "../components/RecipeList";
import theme from "../style/theme";

export default function MyPage() {
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);
  const { id, username } = state.userData;
  const [query, setQuery] = useState({ published: id });
  const { image } = profile;
  const history = useHistory();

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
    margin: 5em 0em 4em 0em;
  `;
  const UserBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0em 2em 4em;
  `;
  const UsernameBox = styled.div`
    margin: 0em 0em 0.5em 0em;
  `;

  const Profile = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const ImageWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid #cfd8dc;

    width: 11rem;
    height: 11rem;

    border-radius: 50%;
    overflow: hidden;
  `;
  const ArticleSelectArea = styled.div`
    display: flex;
    gap: 2em;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom: 3px solid #cfd8dc;
  `;

  const UserEditBtn = styled.button`
    cursor: pointer;
    border-radius: 10px;
    width: 8em;
    font-size: 1.1em;
    &:hover {
      background-color: #66bb6a;
      color: white;
    }
    &:focus {
      outline: none;
    }
    margin: 2.2em 0em 2em 0em;
  `;

  const Btn = styled.span`
    cursor: pointer;
    font-size: 1.2em;
    margin: 0em 0em 0.5em 1.5em;
  `;

  const ArticleArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  return (
    <>
      <Container theme={theme}>
        <UserInfoBox>
          <ImageWrap>
            <Profile src={image} />
          </ImageWrap>
          <UserBox>
            <UsernameBox>{username} 님, 반갑습니다.</UsernameBox>
            <UserEditBtn
              onClick={() => {
                history.push("/useredit");
              }}
            >
              회원정보 수정
            </UserEditBtn>
          </UserBox>
        </UserInfoBox>
        <ArticleSelectArea>
          <Btn onClick={() => handleMyList("published")}>내 게시글</Btn>
          <Btn onClick={() => handleMyList("liked")}>내 관심글</Btn>
        </ArticleSelectArea>
        <ArticleArea>
          <RecipeList query={query} />
        </ArticleArea>
      </Container>
    </>
  );
}
