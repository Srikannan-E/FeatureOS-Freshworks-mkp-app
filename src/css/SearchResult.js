import styled from "@emotion/styled";

export const ScrollContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const SearchField = styled.div`
  height: 48px;
  margin-left: -9px;
  position: fixed;
  top: 0px;
  width: 640px;
  background-color: white;
  padding: 0px 10px 14px 15px;
  z-index: 2;
`;

export const Searchdescript = styled.h2`
  margin-left: 0px;
  position: fixed;
  top:33px;
  z-index: 2;
  background-color: white;
  width: 655px;
  height: 6px;
  padding: 0px 0px 0px 10px;
  color: #576c7d;
  font-feature-settings: "clig" off, "liga" off;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
`;

export const Noposts = styled.div`
  width: Hug (269px);
  height: Hug (128px);
  margin-top: 120px;
  margin-left: 93px;
  gap: 8px;
`;

export const Nopostsvg = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 40px;
  margin-left: 205px;
`;

export const NopostsDescript = styled.h1`
  stylename: Body-14px/Semibold;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.07999999821186066px;
  text-align: center;
  width: 230px;
  margin-left: 127px;
  color: rgba(71, 88, 103, 1);
`;

export const CreatePost = styled.a`
  stylename: Body-14px/Regular;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.07999999821186066px;
  text-align: center;
  color: rgba(44, 92, 197, 1);
  margin-top: 20px;
  cursor: pointer;
`;

export const FeedbackContainer = styled.div`
  margin-top: 68px;
`;

export const FeedbackDiv = styled.div`
  width: 92%;
  display: flex;
  overflow-wrap: anywhere;
  flex-shrink: 2;
  padding-right: 48px;
  margin-top: 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f5f7f9;
  }
  overflow: hidden;
`;

export const FeedbackDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 5px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const FeedbackTitle = styled.h1`
  height: 20px;
  color: #12344d;
  font-feature-settings: "clig" off, "liga" off;
  margin-top: 8px;
  margin-left: 10px;
  margin-bottom: 0px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.08px;
`;

export const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
`;

export const FeedbackDescription = styled.h3`
  width: 558px;
  height: 80px;
  margin-left: 10px;
  color: var(--s-700, #475867);
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 12px;

  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.08px;
  flex: 48;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* Adjust this number to limit the number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

`;

export const FeedbackNextDescription = styled.div`
  display: flex;
  width: 508px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export const Upvote = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 12px;
  margin-top: 1px;
`;

export const VoteCount = styled.h3`
  color: #12344D;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-top: -26px;
  margin-left: 32px;
  margin-bottom: 0px;
  line-height: 16px; /* 133.333% */
`;

export const StatusDiv = styled.div`
  display: flex;
  padding: 0px 3px;
  align-items: center;
  height: 29px;
  margin-top: 0px;
  margin-left: 10px;
  gap: 2px;
  border-radius: 4px;
  background: #ebeff3;
`;

export const Status = styled.h3`
  color: #384551;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  padding-right: 5px;
  padding-left: 5px;
  line-height: normal;
`;

export const FeedBackDate = styled.h3`
  color: var(--s-500, #647a8e);
  margin-left: 12px;
  margin-top: 1px;
  margin-bottom: 0px;
  font-feature-settings: "clig" off, "liga" off;
  line-width: 10px;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
 
`;

export const Datespan = styled.p`
  color: var(--s-500, #647a8e);
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  margin-top: -14px;
  margin-left: 65px;
  line-height: 16px; /* 133.333% */
`;
