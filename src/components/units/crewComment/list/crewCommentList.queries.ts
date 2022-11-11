import { gql } from "@apollo/client";

export const FETCH_CREW_SUB_COMMENTS = gql`
  query fetchCrewSubComments(
    $commentId: String!
    $boardId: String!
    $page: Int
  ) {
    fetchCrewSubComments(
      commentId: $commentId
      boardId: $boardId
      page: $page
    ) {
      id
      comment
      createdAt
      # user{
      # id
      # nickname
      # profile_img
      # }
    }
  }
`;