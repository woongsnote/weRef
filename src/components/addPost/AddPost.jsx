import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../header/Header";
import AddPostStyle from "./AddPostStyle.css";

import axios from "axios";
import { postPosts } from "../../redux/modules/post";
import { getPosts } from "../../redux/modules/post";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { AltRoute } from "@mui/icons-material";

const AddLinks = () => {
  const [refLinks, setRefLinks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(1);

  const handleChange = (e) => setInputText(e.target.value);
  const handleClick = () => {
    if (nextId > 5) {
      alert("이미 5개나 적으셨는골");
    } else if (inputText === "") {
      alert("링크를 적어주세요!");
    } else {
      const newList = refLinks.concat({
        id: nextId,
        link: inputText,
      });
      setNextId(nextId + 1);
      setRefLinks(newList);
      setInputText("");
    }
  };
  const handleDelete = (id) => {
    const newList = refLinks.filter((refLink) => refLink.id !== id);
    setNextId(nextId - 1);
    setRefLinks(newList);
  };

  const refList = refLinks.map((refLink) => (
    <div key={refLink.id}>
      <li id={refLink.id} value={refLink.link}>
        <CloseIcon onClick={() => handleDelete(refLink.id)} /> {refLink.link}
      </li>
    </div>
  ));

  return (
    <>
      <ul>{refList}</ul>
      <TextField
        value={inputText}
        onChange={handleChange}
        label="추천할 링크를 적어주세요! (최대 5개)"
        id="outlined-size-small"
        size="small"
      />
      <Button onClick={handleClick} variant="contained" size="small">
        추가하기
      </Button>
    </>
  );
};

export default function AddPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("yohan@naver.com");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const titleHandle = (e) => {
    setTitle(e.target.value);
  };
  const descriptionHandle = (e) => {
    setDescription(e.target.value);
  };

  // 이미지 미리보기
  const [imgView, setImgView] = useState();
  const fileChange = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    console.log(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgView(reader.result);
        setImgUrl(fileBlob);
        resolve();
      };
    });
  };

  // 이미지 삭제
  const deleteImg = () => {
    URL.revokeObjectURL(imgView);
    URL.revokeObjectURL(imgUrl);
    setImgView("");
    setImgUrl("");
  };

  let refUrl = [];

  let data = {
    title: title,
    description: description,
    // multipartFile: imgUrl,
    refUrl: refUrl,
  };

  const addPost = () => {
    if (title === "" || description === "") {
      alert("제목/내용을 적어주세요!");
    } else {
      for (let i = 1; i <= 5; i++) {
        if (document.getElementById(`${i}`) === null) {
          break;
        } else {
          refUrl.push(document.getElementById(`${i}`).value);
        }
      }

      let formData = new FormData();

      formData.append(
        "requestDto",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      formData.append("multipartFile", imgUrl);
      // for (let i of formData.entries()) {
      //   console.log(i);
      // }
      // console.log(formData);

      const apiPost = {
        url: "http://13.125.246.47:8080/api/auth/post",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MjU2MzQ3NH0.ntv2Ikxj3m6QYo_bvD4wD9UZL-fyGJ5cg97j4GD4eLb6jG0XxklYr3SaD1xmrW4oNEjh6zKFPRLfoWqE7-5frg",
          "Refresh-Token":
            "eyJKV1RfSEVBREVSX1BBUkFNX1RZUEUiOiJoZWFkZXJUeXBlIiwiYWxnIjoiSFM1MTIifQ.eyJleHAiOjE2NjMxNjY0NzR9.1qzUQrpqrPnWzzG-YqwT9J-rxoGzagLPLkfF01_XyRaRPFNkw35AWV-N_RRzMkYVaTr0Wcz_xexhQZCD85gWew",
        },
        withCredentials: true,
      };
      axios(apiPost);
      
      
      // yeB
      // const header = {
      //   'Content-Type':'multipart/form-data',
      //   Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MjU1NDU2MH0.bz92LjuUnbR_1vsoc3nnHyQzeFaOiSiwhU8mZ0w9_1hflB_2akxaE1R69eYhQf-myDY6soiVlNFaM1C-F3-7tA",
      //   "Refresh-Token":
      //       "eyJKV1RfSEVBREVSX1BBUkFNX1RZUEUiOiJoZWFkZXJUeXBlIiwiYWxnIjoiSFM1MTIifQ.eyJleHAiOjE2NjMxNTc1NjB9.Atxy67FGhcmJTF6_h_arcNG3DoJu-yood3NJpvXA7w10A2P_1phKIxYOCCwt1ajYcQ9pZoSJdX241kREMpYB5Q",
      // }
      // axios.post("http://13.125.246.47:8080/api/auth/post",{header,formData,withCredentials: true});

      // dispatch(postPosts(data));
      dispatch(getPosts());
      navigate("/");
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <form name="file" className="addPost">
        <div className="addPostTop">
          <div className="imgFile">
            <div>
              <label htmlFor="inputFile">사진 추가 +</label>
              <input
                id="inputFile"
                type="file"
                name="file"
                accept="image/*"
                multiple="multiple"
                style={{ display: "none" }}
                onChange={(e) => {
                  fileChange(e.target.files[0]);
                }}
              />
            </div>
            <img src={imgView} />
            <span onClick={deleteImg}>제거하기</span>
          </div>
          <div className="linkUrls">
            <div className="refLinks">
              <AddLinks />
            </div>
          </div>
        </div>
        <div className="addPostBody">
          <TextField
            id="title"
            label="제목"
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            onChange={titleHandle}
          />
          <br />
          <br />
          <TextField
            id="description"
            label="내용을 입력해주세요!"
            placeholder="Placeholder"
            multiline
            inputProps={{ maxLength: 300 }}
            onChange={descriptionHandle}
          />
        </div>

        <div className="appPostBtns">
          <Button onClick={goBack} variant="contained">
            뒤로가기
          </Button>
          <Button variant="contained" onClick={addPost}>
            저장하기
          </Button>
        </div>
      </form>
    </>
  );
}
