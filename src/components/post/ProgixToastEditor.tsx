import React from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';
import { getCookie } from '../../shared/cookie';

const ProgixToastEditor = (props: any) => {
  // 파일 업로드를 위한 개별 content-Type 설정
  const accessToken = getCookie('Authorization');
  // 업로드 이미지 관리
  const onUploadImage = async (blob: any, callback: any) => {
    try {
      const formData = new FormData();
      formData.append('file', blob);
      const url = await axios.post(
        `${process.env.REACT_APP_BACKEND_TEMP_ADDRESS}/notice/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      callback(
        `${process.env.REACT_APP_S3_FILE_UPLOAD}/${url.data.result[0]}`,
        'alt text'
      );
      props.SetImgList((state: any) => [...state, url.data.result[0]]);
    } catch (err) {}

    return false;
  };

  return (
    <Wrap>
      <Editor
        ref={props.editorRef} // DOM 선택용 useRef
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="600px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        useCommandShortcut={false} // 키보드 입력 컨트롤 방지
        hooks={{
          addImageBlobHook: onUploadImage,
        }} // 이미지 가로채기
      ></Editor>
    </Wrap>
  );
};

export default ProgixToastEditor;

const Wrap = styled.div`
  width: 100%;
  button {
    // toast-ui 내부 button에 영향을 줘서 글로벌 스타일 상쇄
    padding: 0rem;
    font-weight: 500;
    display: inline;
  }
`;
