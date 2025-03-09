import React from "react";
import styled from "@emotion/styled";
import { ViewAll } from "./ViewAll";
const ViewAllModal = ({ }) => (
  <ModalContent>
    <ViewAll />
  </ModalContent>
);

export default ViewAllModal;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
`;
