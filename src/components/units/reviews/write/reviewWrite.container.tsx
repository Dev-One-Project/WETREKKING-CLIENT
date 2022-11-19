import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import CrewReviewWriteUi from "./reviewWrite.presenter";
import { CREATE_REVIEW, UPLOAD_FILES_REVIEW } from "./reviewWrite.queries";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormData } from "./reviewWrite.types";
import { IMutation } from "../../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { crewBoardIdState } from "../../../../store";
import { FETCH_CREW_BOARD } from "../../crews/detail/crewDetail.queries";

const schema = yup.object({
  title: yup.string().required("제목을 입력해주세요"),
  review: yup.string().required("내용을 입력해주세요"),
});

const CrewReviewWrite = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [rate, setRate] = useState(5);
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  const [crewBoardId] = useRecoilState(crewBoardIdState);

  const [createReview] =
    useMutation<Pick<IMutation, "createReviewBoard">>(CREATE_REVIEW);
  const [uploadFileReview] =
    useMutation<Pick<IMutation, "uploadFilesForReviewBoard">>(
      UPLOAD_FILES_REVIEW
    );
  const onChangeRate = (value: number) => {
    setRate(value);
  };

  const { data: crewBoardInfo } = useQuery(FETCH_CREW_BOARD, {
    variables: {
      crewBoardId: crewBoardId,
    },
  });

  console.log(crewBoardInfo);

  const onClickRegister = async (data: IFormData) => {
    try {
      const results = await Promise.all(
        files.map(
          async (files) =>
            await (files && uploadFileReview({ variables: { files } }))
        )
      );
      const resultUrls = results.map((el) =>
        el ? el.data?.uploadFilesForReviewBoard : ""
      );

      const resultUrlsFlat = resultUrls.flat();

      data.star = rate;

      console.log(data);

      await createReview({
        variables: {
          crewUserListId: "asdasdad-asdas-dasdasd-sad",
          createReviewBoardInput: data,
          imgURL: resultUrlsFlat,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const onChangeFile =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          const tempUrls = [...imageUrls];
          tempUrls[index] = event.target.result;
          setImageUrls(tempUrls);

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };

  return (
    <CrewReviewWriteUi
      register={register}
      handleSubmit={handleSubmit}
      onChangeRate={onChangeRate}
      onClickRegister={onClickRegister}
      onChangeFile={onChangeFile}
      imageUrls={imageUrls}
      errors={errors}
      crewBoardInfo={crewBoardInfo}
    />
  );
};

export default CrewReviewWrite;
