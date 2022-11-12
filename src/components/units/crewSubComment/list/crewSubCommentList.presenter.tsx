import * as S from "./crewSubCommentList.styles";
import { Avatar } from "@mui/material";
import { getDate, getTime } from "../../../../commons/utils/getDate";
import ConfirmModal from "../../../commons/modals/confirmModal";

const CrewSubCommentListUi = ({
  subCommentsMap,
  onClickShowModal,
  onClickCancelModal,
  onClickModalConfirm,
  isModalOpen,
  isEditOpen,
  onChangeEditComment,
  onClickEdit,
  onClickEditBtn,
  editComments,
}) => {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <Avatar
            alt="Crew Image"
            src="/images/commons/profile-img.png"
            className="avatar"
          ></Avatar>
          <S.CommentBox>
            <S.NickName>{subCommentsMap?.user.nickname}</S.NickName>
            <S.Comment>{subCommentsMap?.comment}</S.Comment>
            <S.CommentInformBox>
              <S.DateBox>
                <S.Date>{getDate(subCommentsMap?.createdAt)}</S.Date>
                <S.Date>|</S.Date>
                <S.Date>{getTime(subCommentsMap?.createdAt)}</S.Date>
              </S.DateBox>
              <S.BtnBox>
                <S.Btn id={subCommentsMap?.id} onClick={onClickEditBtn}>
                  수정
                </S.Btn>
                <S.BtnDot>·</S.BtnDot>
                <S.Btn onClick={onClickShowModal} id={subCommentsMap?.id}>
                  삭제
                </S.Btn>
              </S.BtnBox>
            </S.CommentInformBox>
          </S.CommentBox>
        </S.Container>
        <ConfirmModal
          onOk={onClickModalConfirm}
          onCancel={onClickCancelModal}
          contents="댓글을 삭제하시겠습니까?"
          open={isModalOpen}
        />
      </S.Wrapper>
      {isEditOpen && (
        <>
          <S.EditContainer>
            <S.EditContents
              onChange={onChangeEditComment}
              id="clear"
              defaultValue={subCommentsMap?.comment || editComments}
            ></S.EditContents>
            <S.EditRegisterBox>
              <S.EditRegisterBtn onClick={onClickEdit}>수정</S.EditRegisterBtn>
            </S.EditRegisterBox>
          </S.EditContainer>
        </>
      )}
    </>
  );
};

export default CrewSubCommentListUi;
