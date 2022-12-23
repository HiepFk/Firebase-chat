import React from "react";
import styled from "styled-components";
function FileUpload({ showImg, setImg, setShowImg }) {
  const transform = (file) => {
    const reader = new FileReader();
    if (file) {
      setImg(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setShowImg(reader.result);
      };
    }
  };

  return (
    <Wrapper className="container">
      <label htmlFor="img" className="label_img">
        📁
      </label>
      {showImg && <img src={showImg} alt="" className="img_upload" />}
      <input
        type="file"
        accept="image/*"
        id="img"
        className="form__upload"
        onChange={(e) => {
          transform(e.target.files[0]);
        }}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: rgb(58, 58, 58);
  .form__upload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .label_img {
  }
  .img_upload {
    height: 4rem;
    padding-right: 1rem;
    object-fit: cover;
  }
`;
export default FileUpload;
