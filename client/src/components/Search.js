import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import styled from "styled-components";
import theme from "../style/theme";
import swal from "sweetalert";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  > #laptopSearch {
    > #searchBtn {
      margin-left: 10px;
      margin-top: 5px;
    }
  }
`;
const Input = styled.input`
  grid-area: Middle;
  background-color: transparent !important;
  border: 2px solid #ff71ce;
  border-radius: 5px;
  color: #ff71ce;
  width: 13em;
  height: 2em;
  margin: 0.4em;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @media ${(props) => props.theme.tablet} {
    width: 10em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 14em;
    height: 3em;
  }
  @media ${(props) => props.theme.minimum} {
    width: 14em;
    height: 3em;
  }
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
  @media ${(props) => props.theme.mobile} {
    height: 3em;
  }
  @media ${(props) => props.theme.minimum} {
    height: 3em;
  }
  > option {
    background-color: #232b6a;
  }
`;
const MobileSearch = styled.div`
  display: none;
  @media ${(props) => props.theme.minimum} {
    display: flex;
  }
  @media ${(props) => props.theme.mobile} {
    display: flex;
  }
  @media ${(props) => props.theme.tablet} {
    display: none;
  }
  @media ${(props) => props.theme.desktop} {
    display: none;
  }
  > #searchBtn {
    margin-left: 10px;
    margin-top: 5px;
    @media ${(props) => props.theme.mobile} {
      margin-top: 11px;
    }
    @media ${(props) => props.theme.minimum} {
      margin-top: 11px;
    }
  }
`;
const ActiveLaptopSearch = styled.div`
  display: flex;
  @media ${(props) => props.theme.minimum} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const LaptopSearch = styled.div`
  display: flex;
  @media ${(props) => props.theme.minimum} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

export default function Search({ handleHamburger }) {
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
    if (e.key === "Enter") {
      searchClick();
    }
  };
  const pressEnter2 = (e) => {
    if (e.key === "Enter") {
      searchClick2();
    }
  };

  const searchClick = () => {
    if (searchValue === "") {
      swal({
        title: "Invalid Input!",
        text: "검색어를 입력해주세요.",
        icon: "warning",
        button: "확인",
      });
    } else {
      setSearch(!search);
      setSearchValue("");
      history.push(`/main?${selectValue}=${searchValue}`);
    }
  };

  const searchClick2 = () => {
    if (searchValue === "") {
      swal({
        title: "Invalid Input!",
        text: "검색어를 입력해주세요.",
        icon: "warning",
        button: "확인",
      });
    } else {
      handleHamburger();
      setSearch(!search);
      setSearchValue("");
      history.push(`/main?${selectValue}=${searchValue}`);
    }
  };

  return (
    <>
      <SearchContainer theme={theme}>
        {search ? (
          <ActiveLaptopSearch id="laptopSearch" theme={theme}>
            <Select value={selectValue} onChange={onChangeSelect} theme={theme}>
              <option value="title">제목</option>
              <option value="tag">해시태그</option>
              <option value="ingredient">재료</option>
            </Select>
            <Input
              value={searchValue}
              onChange={handleOnChange}
              onKeyPress={pressEnter}
              theme={theme}
            />
            <div id="searchBtn">
              <FaSearch onClick={searchClick} />
            </div>
          </ActiveLaptopSearch>
        ) : (
          <LaptopSearch theme={theme}>
            <FaSearch
              onClick={() => {
                setSearch(!search);
              }}
            />
          </LaptopSearch>
        )}
        <MobileSearch theme={theme}>
          <Select value={selectValue} onChange={onChangeSelect} theme={theme}>
            <option value="title">제목</option>
            <option value="tag">해시태그</option>
            <option value="ingredient">재료</option>
          </Select>
          <Input
            value={searchValue}
            onChange={handleOnChange}
            onKeyPress={pressEnter2}
            theme={theme}
          />
          <div id="searchBtn">
            <FaSearch onClick={searchClick2} />
          </div>
        </MobileSearch>
      </SearchContainer>
    </>
  );
}
