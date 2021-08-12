import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setPageInit } from "../actions";

const TopButtonContainer = styled.button`
  position: fixed;
  width: 50px;
  height: 50px;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  background-color: red;
  transition-duration: 0.5s;
  &.deactive {
    opacity: 0;
  }
`;

export default function TopButton({ active }) {
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    dispatch(setPageInit());
  };
  return (
    <TopButtonContainer
      className={active ? "active" : "deactive"}
      onClick={handleBtnClick}
    >
      ^
    </TopButtonContainer>
  );
}

// Top 이동버튼 컴포넌트 입니다