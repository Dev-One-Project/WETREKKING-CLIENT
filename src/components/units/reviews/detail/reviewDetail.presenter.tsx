import { Avatar } from "@mui/material";
import * as S from "./reviewDetail.styles";
import { Rate } from "antd";
import "antd/dist/antd.css";
import ReviewCommentList from "../../reviewComment/list/reviewCommentList.container";
import ReviewCommentWrite from "../../reviewComment/write";
import { IReviewDetailUiProps } from "./reviewDetail.types";
import InfiniteScroll from "react-infinite-scroller";
import { getAge } from "../../../../commons/utils/getAge";
import ConfirmModal from "../../../commons/modals/confirmModal";

const ReviewDetailUi = ({
  data,
  onClickX,
  reviewComments,
  onLoadMore,
  onClickShowModal,
  onClickModalConfirm,
  onClickCancelModal,
  isModalOpen,
  userId,
}: IReviewDetailUiProps) => {
  console.log(data);
  return (
    <>
      <S.Wrapper>
        <S.XBox>
          <S.XBtn onClick={onClickX}></S.XBtn>
        </S.XBox>
        <S.ImgBox>
          <S.MainImg></S.MainImg>
          <S.SubImgBox>
            <S.SubImg></S.SubImg>
            <S.SubImg></S.SubImg>
            <S.SubImg></S.SubImg>
          </S.SubImgBox>
        </S.ImgBox>
        <S.UnderLine></S.UnderLine>
        <S.InformBox>
          <S.WriteProfile>
            <Avatar alt="Crew Image" sx={{ width: 68, height: 68 }}></Avatar>
            <S.WriterInform>
              <S.NickName>{data?.fetchReviewBoard.user.nickname}</S.NickName>
              <S.AgeGenderBox>
                <S.AgeGender>
                  {getAge(String(data?.fetchReviewBoard.user.birth))}
                </S.AgeGender>
                <S.AgeGender>·</S.AgeGender>
                <S.AgeGender>
                  {data?.fetchReviewBoard.user.gender
                    .replace("male", "남성")
                    .replace("female", "여성")}
                </S.AgeGender>
              </S.AgeGenderBox>
            </S.WriterInform>
          </S.WriteProfile>
          <S.Location>
            {data?.fetchReviewBoard.crewUserList.crewBoard.mountain.mountain}
          </S.Location>
          <S.RatingBox>
            <Rate
              allowHalf
              disabled
              value={Number(data?.fetchReviewBoard.star)}
            />
          </S.RatingBox>
        </S.InformBox>
        <S.UnderLine></S.UnderLine>
        <S.Review>{data?.fetchReviewBoard.review}</S.Review>
        <S.UnderLine></S.UnderLine>
        <S.BtnBox>
          {userId === data?.fetchReviewBoard.user.id ? (
            <S.Btn onClick={onClickShowModal} id={data?.fetchReviewBoard.id}>
              삭제
            </S.Btn>
          ) : (
            <></>
          )}
        </S.BtnBox>
        <S.CommentContainer>
          <ReviewCommentWrite />
          <S.ScrollBox>
            <InfiniteScroll
              pageStart={0}
              loadMore={onLoadMore}
              hasMore={true || false}
              useWindow={false}
            >
              {reviewComments?.fetchReviewComments?.map((reviewCommentsMap) => {
                return (
                  <ReviewCommentList
                    reviewCommentsMap={reviewCommentsMap}
                    key={reviewCommentsMap.id}
                  />
                );
              })}
            </InfiniteScroll>
          </S.ScrollBox>
        </S.CommentContainer>
        <ConfirmModal
          onOk={onClickModalConfirm}
          onCancel={onClickCancelModal}
          contents="게시글을 삭제하시겠습니까?"
          open={isModalOpen}
        />
      </S.Wrapper>
    </>
  );
};

export default ReviewDetailUi;
