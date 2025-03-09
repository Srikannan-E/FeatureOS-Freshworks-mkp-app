import React, { useState } from "react";
import { Constants } from "../constants";
import { SearchResult } from "./SearchResult";
import { DetailedView } from "./DetailedView";

export const ModalContent = ({ client, searchValue, categorys, jwtToken }) => {
  const [modalView, setModalView] = useState(
    Constants.COMPONENT_IDS.SEARCH_POST
  );
  const [jsonObj, setJsonObj] = useState();
  const [inboxvalue, setInboxValue] = useState(searchValue);
  const [input, setInput] = useState();
  const [jwt, setJwt] = useState(jwtToken);

  const handleContent = (id, inputValue, { item }) => {
    setModalView(id);
    setJsonObj(item);
    setInput(inputValue);
  };

  if (modalView === Constants.COMPONENT_IDS.SEARCH_POST) {
    return (
      <>
        <SearchResult
          inboxvalue={inboxvalue}
          setInboxValue={setInboxValue}
          client={client}
          handleContent={handleContent}
          input={input}
          categorys={categorys}
          jwtToken={jwt}
        />
      </>
    );
  } else if (modalView === Constants.COMPONENT_IDS.RESULT) {
    return (
      <>
        <DetailedView
          setModalView={setModalView}
          jsonObj={jsonObj}
          client={client}
          input={input}
          setInput={setInput}
        />
      </>
    );
  }
  return <div>{child}</div>;
};
