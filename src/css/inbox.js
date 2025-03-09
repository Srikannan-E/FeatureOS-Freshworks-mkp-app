import styled from "@emotion/styled";
import style from "styled-components";

export const SearchField = styled.div`
  height: 32px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const Input = style("fw-input")`
      height: 42px;
      background-color: white;
      width: 70%;
      border-radius: 4px;
      position: absolute;
      margin-top: 6px;  
      padding-left: 4px;
     
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
   
    `;

export const StyledSpan = styled.span`
  margin-left: 35px;
  font-size: 15px;
  font-weight: 550;
  line-height: 20px;
  letter-spacing: 0px;
  line-width: 20px;
  text-align: left;
  color: #12344d;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const Button = styled.button`
  position: absolute;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#475867")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  color: #fff;
  line-width: 50px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 6px, 12px, 6px, 12px;
  right: 4px;
  top: 5px;
  border: 1px rgba(18, 52, 77, 1);
  border-radius: 4px;
  height: 32px;
  width: 72px;
  background: linear-gradient(0deg, #12344d, #12344d),
    linear-gradient(180deg, #264966 2.56%, #12344d 95.75%);
    &:hover {
      background: linear-gradient(0deg, #0f2b3a, #0f2b3a),
      linear-gradient(180deg, #1d3f5a 2.56%, #0f2b3a 95.75%);
    }
`;

export const CreatePost = styled.button`
  border: 1px rgba(18, 52, 77, 1);
  height: 42px;
  width: 97%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 23px;
  margin-left: 4px;
  background: rgba(245, 247, 249, 1);
  cursor: pointer;
  border-radius: 4px;
`;

export const PlusIcon = styled.img`
  width: 12px;
  height: 12px;
  object-fit: cover;
  position: absolute;
  left: 18px;
  top: 70px;
  cursor: pointer;
`;

export const IconsAppIconsOpenNewTab = styled.img`
  cursor: pointer;
  padding-top: 2px;
`;
export const SetUpRequired = styled.div`
  width: 285px;
  height: 140px;
  overflow: hidden;
  background-color: rgb(245, 247, 249);
  border-radius: 8px;
  position: absolute;
  top: 6px;
  left: 8px;
`;

export const IconsAppIcons = styled.div`
  left: 15px;
  top: 17px;
  position: absolute;
`;

export const SetUpRequiredText = styled.span`
  color: #12344d;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 14px;
  font-style: normal;
  position: absolute;
  top: 50px;
  left: 15px;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

export const SetUpRequiredDescription = styled.span`
  color: #647a8e;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  text-align: left;
  position: absolute;
  width: 80%;
  top: 75px;
  left: 15px;
`;

export const WrapText = styled.a`
  position: absolute;
  display: flex;
  gap: 4px;
  flex-direction: row;
  text-decoration: none;
  left: 10px;
  top: 110px;
`;

export const SetUpText = styled.span`
  color: #2c5cc5;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
  text-align: left;
  margin-top: 2px;
  margin-left: 5px;
`;
