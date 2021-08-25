import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import RecipeList from "../components/RecipeList";
import theme from "../style/theme";

const Container = styled.div`
  display: grid;
  color: white;
  min-height: 770px;

  @media ${(props) => props.theme.minimum} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.1fr 3fr;
    grid-template-areas: "Profile" "User" "Article";
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.1fr 3fr;
    grid-template-areas: "Profile" "User" "Article";
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.1fr 1fr;
    grid-template-areas: "Profile User" "Article Article";
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.1fr 1fr;
    grid-template-areas: "Profile User" "Article Article";
  }
`;

const ProfileBox = styled.div`
  grid-area: Profile;
  display: flex;
  height: 20em;
  flex-direction: column;
  place-self: center;
  justify-content: center;
  align-items: center;
  margin: 2em 5em 2em 5em;
`;
const UserBox = styled.div`
  grid-area: User;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${(props) => props.theme.minimum} {
    align-items: center;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
  }
  @media ${(props) => props.theme.tablet} {
    align-items: flex-start;
  }
  @media ${(props) => props.theme.desktop} {
    align-items: flex-start;
  }
`;
const UsernameBox = styled.div`
  font-size: 1.2em;
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
const ArticleBox = styled.div`
  grid-area: Article;
`;
const ArticleSelectArea = styled.div`
  display: flex;
  gap: 2em;

  border-bottom: 3px solid #cfd8dc;
  text-decoration: underline;
  @media ${(props) => props.theme.minimum} {
    justify-content: space-evenly;
  }
  @media ${(props) => props.theme.mobile} {
    justify-content: space-evenly;
  }
  @media ${(props) => props.theme.tablet} {
    justify-content: flex-start;
  }
  @media ${(props) => props.theme.desktop} {
    justify-content: flex-start;
  }
`;

const UserEditBtn = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  width: 8em;
  font-size: 1.1em;
  color: white;
  text-decoration: underline;
  color: white;
  &:hover {
    color: #ff71ce;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
  margin: 2.2em 0em 2.2em 0em;
  @media ${(props) => props.theme.minimum} {
    justify-content: center;
  }
  @media ${(props) => props.theme.mobile} {
    justify-content: center;
  }
  @media ${(props) => props.theme.tablet} {
    align-items: flex-start;
  }
  @media ${(props) => props.theme.desktop} {
    align-items: flex-start;
  }
`;

const MyArticleBtn = styled.span`
  cursor: pointer;
  display: flex;
  font-size: 1.2em;
  text-decoration: underline;
  color: ${(props) => {
    return props.active ? "#ff71ce" : "white";
  }};

  &:hover {
    color: #ff71ce;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
  @media ${(props) => props.theme.minimum} {
    margin: 0em 0em 0.5em 0em;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
    margin: 0em 0em 0.5em 0em;
  }
  @media ${(props) => props.theme.tablet} {
    align-items: flex-start;
    margin: 0em 0em 0.5em 1.5em;
  }
  @media ${(props) => props.theme.desktop} {
    align-items: flex-start;
    margin: 0em 0em 0.5em 1.5em;
  }
`;
const MyFavoriteBtn = styled.span`
  cursor: pointer;
  display: flex;
  font-size: 1.2em;
  text-decoration: underline;
  color: ${(props) => {
    return props.active ? "white" : "#ff71ce";
  }};
  &:hover {
    color: #ff71ce;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
  @media ${(props) => props.theme.minimum} {
    margin: 0em 0em 0.5em 0em;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
    margin: 0em 0em 0.5em 0em;
  }
  @media ${(props) => props.theme.tablet} {
    align-items: flex-start;
    margin: 0em 0em 0.5em 1.5em;
  }
  @media ${(props) => props.theme.desktop} {
    align-items: flex-start;
    margin: 0em 0em 0.5em 1.5em;
  }
`;

const ArticleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function MyPage() {
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);

  const { id, username } = state.userData;
  const [query, setQuery] = useState({ published: id });
  const [checkBtn, setBtn] = useState(true);

  const { image } = profile;
  const history = useHistory();

  const handleMyList = (type) => {
    if (String(Object.keys(query)) !== String([type])) {
      setBtn(!checkBtn);
    }
    setQuery({ [type]: id });
  };

  return (
    <>
      <Container theme={theme}>
        <ProfileBox>
          <ImageWrap>
            <Profile src={image} />
          </ImageWrap>
        </ProfileBox>
        <UserBox theme={theme}>
          <UsernameBox>{username} 님, 반갑습니다.</UsernameBox>
          <UserEditBtn
            theme={theme}
            onClick={() => {
              history.push("/useredit");
            }}
          >
            회원정보 수정
          </UserEditBtn>
        </UserBox>

        <ArticleBox>
          <ArticleSelectArea theme={theme}>
            <MyArticleBtn
              theme={theme}
              active={checkBtn}
              onClick={() => handleMyList("published")}
            >
              내 게시글
            </MyArticleBtn>
            <MyFavoriteBtn
              theme={theme}
              active={checkBtn}
              onClick={() => handleMyList("liked")}
            >
              내 관심글
            </MyFavoriteBtn>
          </ArticleSelectArea>
          <ArticleArea>
            <RecipeList query={query} />
          </ArticleArea>
        </ArticleBox>
      </Container>
    </>
  );
}