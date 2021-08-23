import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import styled from "styled-components";
import theme from "../style/theme";

const SearchContainer = styled.div`
  /* margin-right: px; */
  display: flex;
  align-items: center;
  > div {
    display: flex;
    > #searchBtn {
      margin-left: 10px;
      margin-top: 5px;
    }
  }
`;
const Input = styled.input`
  grid-area: Middle;
  /* display: flex;
  justify-self: center;
  align-self: center;
  text-align: center; */
  background-color: transparent !important;
  border: 2px solid #ff71ce;
  border-radius: 5px;
  color: #ff71ce;
  width: 10em;
  height: 2em;
  margin: 0.4em;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const Select = styled.select`
  background-color: transparent !important;
  border: 2px solid #ff71ce;
  border-radius: 5px;
  color: #ff71ce;
  width: 6em;
  height: 2em;
  margin: 0.4em;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @media ${(props) => props.theme.tablet} {
    width: 5em;
  }
  > option {
    background-color: #232b6a;
  }
`;
// button {
//   background-color: transparent;
//   border: 2px solid #ff71ce;
//   border-radius: 10px;
//   color: #ff71ce;
//   cursor: pointer;
//   padding: 10px;
//   -webkit-transition-duration: 0.2s;
//   -o-transition-duration: 0.2s;
//   transition-duration: 0.2s;
//   -webkit-box-sizing: border-box;
//   box-sizing: border-box;
// }

export default function Search({ query }) {
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("title");
  const history = useHistory();

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };
  const pressEnter = (e) => {
    if (e.key === "Enter") searchClick();
  };

  const searchClick = () => {
    setSearch(!search);
    setSearchValue("");
    history.push(`/main?${selectValue}=${searchValue}`);
  };

  return (
    <>
      <SearchContainer>
        {search ? (
          <div>
            <Select value={selectValue} onChange={onChangeSelect} theme={theme}>
              <option value="title">제목</option>
              <option value="tag">해시태그</option>
              <option value="ingredient">재료</option>
            </Select>
            <Input
              value={searchValue}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
            />
            <div id="searchBtn">
              <FaSearch onClick={searchClick} />
            </div>
          </div>
        ) : (
          <FaSearch
            onClick={() => {
              setSearch(!search);
            }}
          />
        )}
      </SearchContainer>
    </>
  );
}
