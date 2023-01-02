import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import { IModalProps } from '../../../shared/type/Interface';
import AlarmTansferDetailTable from '../../table/AlarmTransferDetailTable';
import AlarmTransferHistroyTable from '../../table/AlarmTransferHistoryTable';
import SkeletonTable from '../../suspense/SkeletonTable';
import AlarmTransferModal from './AlarmTransferModal';

const AlarmHistoryModal = (props: IModalProps) => {
  // 메세지 작성 모달창
  const [is_open, setIsOpen] = useState<boolean>(false);
  // 메세지 전송 내역 세부사항 클릭 여부
  const [detail_click, setDetailClick] = useState<boolean>(false);
  // 메세지 전송 내역 세부사항 클릭시 id 값 받아오기
  const [postId, setPostId] = useState<string>('');
  // 메세지 전송 내역 세부사항 클릭시 작성일자 받아오기
  const [postRepairDate, setpostRepairDate] = useState<string>('');
  return (
    <Wrap>
      <div className={props.open ? 'openModal modal' : 'modal'}>
        {props.open ? (
          <section>
            <header>
              <span>{props.header}</span>
              <button
                className="close"
                onClick={() => {
                  setDetailClick(false);
                  props.setIsOpen(false);
                }}
              >
                &times;
              </button>
            </header>
            <main>
              <div className="main_top">
                <span>
                  모델명 : <strong>{props.model}</strong>
                </span>
                {detail_click ? (
                  postRepairDate
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    메시지 작성
                  </button>
                )}
              </div>
              <div className="main_content">
                {detail_click ? (
                  <Suspense fallback={<SkeletonTable />}>
                    <AlarmTansferDetailTable
                      setDetailClick={setDetailClick}
                      postId={postId}
                      view={props.view}
                      setpostRepairDate={setpostRepairDate}
                    />
                  </Suspense>
                ) : (
                  <Suspense fallback={<SkeletonTable />}>
                    <AlarmTransferHistroyTable
                      setDetailClick={setDetailClick}
                      setPostId={setPostId}
                      view={props.view}
                    />
                  </Suspense>
                )}
              </div>
            </main>
          </section>
        ) : null}
      </div>
      {/* 알림 전송 작성 모달창 */}
      <AlarmTransferModal
        open={is_open}
        setIsOpen={setIsOpen}
        header="메세지 전송"
        view={props.view}
      />
    </Wrap>
  );
};

export default AlarmHistoryModal;

const Wrap = styled.div`
  .openModal.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: modal-bg-show 0.3s;
  }

  section {
    width: 600px;
    @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
      width: 360px;
    }
    max-height: 90%;
    background-color: #fff;
    // 모달이 스르륵 열리는 효과인데, input이 깨지는 효과가 있어서 잠시 보류
    // animation: modal-show 0.3s;
    overflow-y: auto;
    header {
      background-color: #f6f7fb;
      font-weight: 700;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        font-size: 21px;
        padding: 0;
        color: #999;
        background-color: transparent;
      }
    }

    main {
      padding: 16px;
      border-top: 1px solid #dee2e6;
      .main_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
          background-color: ${(props) => props.theme.color.PastelBlue};
        }
      }
    }
  }
`;
