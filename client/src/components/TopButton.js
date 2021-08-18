import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setHeaderActive, setPageInit } from "../actions";
import { BiArrowToTop } from "react-icons/bi";

const TopButtonContainer = styled.button`
  position: fixed;
  right: 7%;
  bottom: 50px;
  font-size: 25px;
  border-radius: 50%;
  color: #ff71ce;
  transition-duration: 0.5s;
  &.deactive {
    opacity: 0;
  }
`;

export default function TopButton({ active }) {
  const dispatch = useDispatch();
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
    >
      <BiArrowToTop />
    </TopButtonContainer>
  );
}

// Top 이동버튼 컴포넌트 입니다
