import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setHeaderActive, setPageInit } from "../actions";
import { BiArrowToTop } from "react-icons/bi";
import { useEffect, useState } from "react";
import theme from "../style/theme";

const TopButtonContainer = styled.button`
  position: sticky;
  width: 50px;
  height: 50px;
  left: 90%;
  @media ${(props) => props.theme.minimum} {
    left: 80%;
  }
  bottom: 50px;
  margin-bottom: 50px;
  font-size: 25px;
  border-radius: 50%;
  border: 3px solid #ff71ce;
  color: #ff71ce;
  transition-duration: 0.5s;
  &:hover {
    border: 3px solid white;
    color: white;
  }
  &.deactive {
    opacity: 0;
  }
`;

export default function TopButton() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleBtnClick = () => {
    dispatch(setHeaderActive(false));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TopButtonContainer
      className={active ? "active" : "deactive"}
      onClick={handleBtnClick}
      theme={theme}
    >
      <BiArrowToTop />
    </TopButtonContainer>
  );
}

// Top 이동버튼 컴포넌트 입니다
