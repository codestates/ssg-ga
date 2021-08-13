import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import axios from "axios";
import {
  validCheckEmail,
  validCheckUsername,
  validCheckPassword,
  validCheckDuplicatePassword,
} from "../utils/validCheck";

export default function UserEdit() {
  const fileInput = useRef(null);
  const [image, setImage] = useState("");

  const handleUploadProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", fileInput.current.files[0]);

      let response = await axios.post(
        `${process.env.REACT_APP_END_POINT}/user/image`,
        formData
      );
      if (response.status === 200) {
        setImage(response.data.data.url);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // FIXME 회원정보 수정후 리덕스 상태관리 해야함!

  return (
    <>
      <Container>
        <title>회원 정보 수정</title>
        <img src={image} />
        <label htmlFor="profileUpload">
          업로드
          <input
            id="profileUpload"
            type="file"
            ref={fileInput}
            name="picture"
            accept="image/*"
            onChange={handleUploadProfile}
            style={{ display: "none" }}
          />
        </label>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
