import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

export const ModalContainer = () => {
  const [selected, setIsSeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const handleClickModal = () => {
    setIsSeleted();
  };

  return (
    <>
      <ModalContainer onClick={openModalHandler}>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView>
              <div className="close-btn" onClick={openModalHandler}>
                &times;
              </div>
              <Login />
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
