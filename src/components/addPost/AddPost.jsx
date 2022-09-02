import React from "react";
import { useState } from "react";
import Header from "../header/Header";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddPost() {

    const [userId, setUserId] = useState('yohan@naver.com');
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [createAt, setCreateAt] = useState();




    let data={
        userId: 'yohan@naver.com',
        title:title,
        description:description,
        imgUrl:imgUrl,
        createAt:createAt,
        modifiedAt:'',
        likes:0,
        // url=[1,2,3,4,5]
    }



    return(
        <>
            <Header />
            <form>
                <div>
                    <div>
                        <input type="file" name="file" />
                    </div>
                    <div>
                        <TextField id="standard-basic" label="제목" variant="standard" />
                        <TextField id="standard-basic" label="추천할 사이트 링크를 적어주세요!" variant="standard" />
                        <TextField id="standard-basic" label="추천할 사이트 링크를 적어주세요!" variant="standard" />
                        <TextField id="standard-basic" label="추천할 사이트 링크를 적어주세요!" variant="standard" />
                    </div>
                </div>
                <TextField fullWidth label="내용을 입력해주세요!" id="fullWidth" />
                <div>
                    <Button variant="contained">뒤로가기</Button>
                    <Button variant="contained">저장하기</Button>
                </div>
            </form>
        </>
    )
};
