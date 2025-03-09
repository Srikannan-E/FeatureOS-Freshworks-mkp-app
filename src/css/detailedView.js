import styled from "@emotion/styled";

export const BackButtonFrame = styled.div`
  width: 62px;
  height: 24px;
  position: absolute;
  left: 0px;
  top: 13px;
`;

export const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  background-color: #f5f7f9;
  box-sizing: border-box;
  padding: 5px 8px 5px 8px;
  position: absolute;
  left: 10px;
  top: 0px;
  width: 62px;
  height: 24px;
`;

export const BackIcon = styled.img`
  width: 12px;
  height: 12px;
  object-fit: cover;
`;

export const BackText = styled.span`
  color: #12344d;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  color: ${(props) => (props.isHovered ? "#2C5CC5" : "#12344D")};
`;

export const FeedbackDetails = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 12px;
  margin-top: -9px;
  align-items: flex-start;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  gap: 24px;
`;

export const FeedBack = styled.div`
  margin-top: 72px;
`;

export const VoteDiv = styled.div`
  margin-top: 8px;
`;

export const FeedbackTitle = styled.p`
  color: #12344d;
  margin-top: 60px;
  margin-top: -1px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.32px;
`;

export const FeedbackDescript = styled.p`
  color: #12344d;
  margin-top: -10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.08px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  width: 620px;
`;

export const Upvote = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 5px;
  position: relative;
  top: -24px;
`;

export const VoteCount = styled.p`
  color: #12344D;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-top: -43px;
  margin-left: 29px;
  line-height: 16px; /* 133.333% */
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const CategoryTag = styled.p`
  color: #475867;
  font-size: 12px;
  font-style: normal;
  margin-top: 1px;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
`;

export const CategoryValue = styled.p`
  color: #12344d;
  /* Body-14px/Semibold */
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  margin-top: -16px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.08px;
`;

export const StatusDiv = styled.div`
  display: flex;
  padding: 0px 3px;
  align-items: center;
  height: 29px;
  margin-top: -30px;
  margin-left: 1px;
  gap: 2px;
  border-radius: 4px;
  background: #ebeff3;
`;

export const StatusTag = styled.p`
  color: #475867;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  margin-top: -12px;
  line-height: 16px; /* 133.333% */
`;

export const Status = styled.p`
  color: #475867;
  font-size: 12px;
  padding-right: 5px;
  padding-left: 5px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
`;

export const CreatedOn = styled.p`
  color: #475867;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  margin-top: -14px;
  line-height: 16px; /* 133.333% */
`;

export const Date = styled.p`
  color: #12344d;
  margin-top: -30px;
  /* Body-14px/Semibold */
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.08px;
`;
