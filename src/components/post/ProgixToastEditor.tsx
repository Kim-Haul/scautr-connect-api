import React from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const ProgixToastEditor = () => {
  return (
    <Wrap>
      <Editor
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
      ></Editor>
    </Wrap>
  );
};

export default ProgixToastEditor;

const Wrap = styled.div`
  width: 100%;
`;

const Image = styled.div``;
