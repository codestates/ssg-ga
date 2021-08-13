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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid lime;

  width: 10rem;
  height: 10rem;

  border-radius: 50%;
  overflow: hidden;
`;
const Profile = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 105%;
  height: 105%;
  object-fit: cover;
`;

export default function UserEdit() {
  const fileInput = useRef(null);
  const profile = useSelector((state) => state.profileReducer);
  const { image } = profile;
  const [profileImage, setImage] = useState(image);

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
        <div>회원 정보 수정</div>

        <ImageWrap>
          <Profile src={profileImage} />
        </ImageWrap>
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
