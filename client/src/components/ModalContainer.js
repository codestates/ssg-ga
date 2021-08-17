import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal, showModal } from "../actions";
import styled from "styled-components";
import theme from "../style/theme";
import { TiTimesOutline } from "react-icons/ti";
import Login from "./Login";
import SignUp from "./SignUp";

export const ModalArea = styled.div`
  z-index: 99;
  @media screen and (max-width: 768px) {
    position: relative;
    height: 100%;
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%);
  }
`;

export const ModalBackground = styled.div`
  display: grid;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  place-items: center;
`;

export const ModalView = styled.div`
  z-index: 5;
  border-radius: 10px;
  background-color: #444444;
  width: 32rem;
  height: 37rem;
`;

export const CloseBtn = styled.div`
  display: flex;
  font-size: 40px;
  margin-top: 10px;
  margin-right: 15px;
  cursor: pointer;
  justify-content: flex-end;
`;

export default function ModalContainer() {
  const state = useSelector((state) => state.userReducer);
  const { isSetModal, isShowModal } = state;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(showModal(false));
    dispatch(setModal(false));
  };

  return (
    <>
      <ModalArea theme={theme}>
        {isShowModal ? (
          <ModalBackground onClick={closeModal}>
            <ModalView
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CloseBtn>
                <TiTimesOutline className="closeBtn" onClick={closeModal} />
              </CloseBtn>
              {isSetModal ? <Login /> : <SignUp />}
            </ModalView>
          </ModalBackground>
        ) : null}
      </ModalArea>
    </>
  );
}
