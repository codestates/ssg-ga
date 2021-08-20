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
  -webkit-transform-style: preserve-3d;
  -webkit-transform: translateZ(16px);
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
  background-color: #232b6a;
  width: 30rem;
  height: 37rem;

  @media ${(props) => props.theme.minimum} {
    width: 100%;
    z-index: 5;
    border-radius: 0px;
    height: 40rem;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    z-index: 5;
    border-radius: 0px;
    height: 46rem;
  }
`;

export const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 40px;
  margin-top: 10px;
  margin-right: 15px;
  cursor: pointer;
  color: white;
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
    <ModalArea>
      {isShowModal ? (
        <ModalBackground onClick={closeModal}>
          <ModalView
            theme={theme}
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
  );
}
