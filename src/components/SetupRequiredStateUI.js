import React from "react";
import newTab from "../assets/newTab.svg";
import setup from "../assets/setup.svg";
import {
  IconsAppIconsOpenNewTab,
  SetUpRequired,
  IconsAppIcons,
  SetUpRequiredText,
  SetUpRequiredDescription,
  WrapText,
  SetUpText,
} from "../css/inbox";

export const SetupRequiredStateUI = ({ client }) => {
  //setup required link for firefox
  const isFirefox = () => {
    return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  };

  client.instance.resize({ height: "143px" });
  return (
    <SetUpRequired>
      <IconsAppIcons>
        <IconsAppIconsOpenNewTab src={setup} alt="icon" />
      </IconsAppIcons>
      <>
        <SetUpRequiredText>{"Authorization Required!"}</SetUpRequiredText>
      </>
      <SetUpRequiredDescription>
        {"Please authorise to start creating and upvoting feedback posts"}
      </SetUpRequiredDescription>
      {isFirefox() ? (
        <WrapText>
          <SetUpText>{"Authenticate"}</SetUpText>
        </WrapText>
      ) : (
        <WrapText
          href={
            location.ancestorOrigins[0] +
            "/crm/sales/settings/integrations/third-party-applications/view/all"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <SetUpText>{"Authenticate"}</SetUpText>
          <IconsAppIconsOpenNewTab src={newTab} alt="icon" />
        </WrapText>
      )}
    </SetUpRequired>
  );
};
