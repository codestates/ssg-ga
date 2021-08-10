import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../actions";
import styled from "styled-components";
import Login from "./Login";
import SignUp from "./SignUp";

export default function ModalContainer() {
  const [showModal, setShowModal] = useState(false);
  const state = useSelector((state) => state.userReducer);
  // const { isSetModal } = state;
  const dispatch = useDispatch();

  const closeModal = () => {
    setShowModal(!showModal);
    dispatch(setModal(false));
  };

  return (
    <>
      <ModalArea>
        {showModal ? (
          <ModalBackground onClick={closeModal}>
            <ModalView>
              <div className="close-btn" onClick={closeModal}>
                &times;
              </div>
              {/* {isSetModal ? <Login /> : <SignUp />} */}
            </ModalView>
          </ModalBackground>
        ) : null}
      </ModalArea>
    </>
  );
}

export const ModalArea = styled.div`
  /* height: 15rem;
  text-align: center;
  margin: 120px auto; */
`;

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 30rem;
  height: 30rem;
  > div.close-btn {
    font-size: 30px;
    margin-top: 10px;
    margin-right: 15px;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
  }
`;
