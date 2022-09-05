import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../header/Header";

import axios from "axios";
import { postPosts } from "../../redux/modules/post";
import { eachPosts } from "../../redux/modules/post";
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

export default function EditPost() {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("yohan@naver.com");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const data = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(eachPosts(param.id));
  }, [dispatch]);
  console.log(data)

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

  let newData = {
    userId: userId,
    title: title,
    description: description,
    imgUrl: "",
    likes: 0,
    refUrl: refUrl,
  };

  const eidtPost = () => {
    if (title === "" || description === "") {
      alert("제목/내용을 적어주세요!");
    } else {
      // console.log(imgUrl);
      let formData = new FormData();
      formData.append("file", imgUrl);
      // for (let i of formData.entries()) {
      //   console.log(i);
      // }
      // console.log(formData);
      const apiPost = {
        url: "3001/api/auth/image",
        method: "post",
        data: formData,
        headers: {
          "content-Type": "multipart/form-data",
        },
      };
      axios(apiPost);

      for (let i = 1; i <= 5; i++) {
        if (document.getElementById(`${i}`) === null) {
          break;
        } else {
          refUrl.push(document.getElementById(`${i}`).value);
        }
      }

      dispatch(postPosts(newData));
      navigate("/");
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <form className="addPost">
        <div className="addPostTop">
          <div className="imgFile">
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
            <img src={imgView} />
            <span onClick={deleteImg}>제거</span>
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
            defaultValue={title}
          />
          <br />
          <br />
          <TextField
            id="description"
            label=""
            placeholder=""
            multiline
            inputProps={{ maxLength: 300 }}
            onChange={descriptionHandle}
            defaultValue={description}
          />
        </div>

        <div className="appPostBtns">
          <Button onClick={goBack} variant="contained">
            뒤로가기
          </Button>
          <Button variant="contained" onClick={eidtPost}>
            수정하기
          </Button>
        </div>
      </form>
    </>
  );
}
