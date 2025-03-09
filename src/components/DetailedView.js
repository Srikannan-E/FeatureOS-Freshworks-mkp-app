import React from "react";
import backIcon from "../assets/backIcon.svg";
import hoverIcon from "../assets/hoverIcon.svg";
import upvoteclick from "../assets/upvoteclick.svg";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import { Constants } from "../constants";
import {
  FeedBack,
  BackButtonFrame,
  VoteDiv,
  BackButton,
  BackIcon,
  BackText,
  FeedbackDetails,
  FeedbackTitle,
  FeedbackDescript,
  Upvote,
  VoteCount,
  Category,
  CategoryTag,
  CategoryValue,
  StatusDiv,
  StatusTag,
  Status,
  CreatedOn,
  Date,
} from "../css/detailedView";

export const DetailedView = ({ jsonObj, setModalView, setInput, input }) => {
  const [isHovered, setIsHovered] = useState(false);

  const goBack = () => {
    setModalView(Constants.COMPONENT_IDS.SEARCH_POST);
    setInput(input);
  };

  return (
    <FeedbackDetails>
      <BackButtonFrame>
        <BackButton
          onClick={goBack}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BackIcon src={isHovered ? hoverIcon : backIcon} alt="icon" />
          <BackText isHovered={isHovered}>Back</BackText>
        </BackButton>
      </BackButtonFrame>
      <React.Fragment key={jsonObj.id}>
        <FeedBack>
          <FeedbackTitle>{jsonObj.title}</FeedbackTitle>
          <FeedbackDescript>{jsonObj.description}</FeedbackDescript>
        </FeedBack>
        <VoteDiv>
          <Upvote src={upvoteclick} alt="icon" />
          <VoteCount>Vote ({jsonObj.votes_count})</VoteCount>
        </VoteDiv>
        <StatusTag>Status</StatusTag>
        <StatusDiv>
          <Status>{jsonObj.status}</Status>
        </StatusDiv>
        <Category>
          <CategoryTag>Category</CategoryTag>
          <CategoryValue>{jsonObj.bucket.name}</CategoryValue>
        </Category>
        <CreatedOn>Created on</CreatedOn>
        <Date>{formatDate(jsonObj.created_at)}</Date>
      </React.Fragment>
    </FeedbackDetails>
  );
};
