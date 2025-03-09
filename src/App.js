import React, { useState, useEffect, useLayoutEffect } from "react";
import Loader from "./state/Loader";
import { Inbox } from "./components/Inbox";
import { SetupRequiredStateUI } from "./components/SetupRequiredStateUI";
import { CreatePostComponent } from "./components/CreatePostComponent";
import { Constants } from "./constants";
import { ModalContent } from "./components/ModalContents";

const App = () => {
  //app loading state and child component state
  const [loaded, setLoaded] = useState(false);
  const [child, setChild] = useState(<Loader />);

  let isInstalled;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.freshdev.io/assets/app-client@2.js";
    script.addEventListener("load", () => setLoaded(true));
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  useLayoutEffect(() => {
    const initializeApp = async () => {
      if (!loaded) return;
      try {
        const client = await app.initialized();

        setHome(client);
        client.events.on("app.activated", () => {
          setHome(client);
        });
      } catch (error) {
        console.error("App initialization error");
      }
    };
    initializeApp();
  }, [loaded]);

  const setHome = async (client) => {
    try {
      const { location, data: instanceData = {} } =
        await client.instance.context();
      const modalID = instanceData?.modalID || "";

      if (
        ["chat_conversation_sidebar", "conversation_user_info"].includes(
          location
        )
      ) {
        client.instance.receive(({ data }) => {
          if (data?.refreshSidebar) {
            setHome(client);
          }
        });
        isInstalled = client.context.settings.account_authenticated;

        if (isInstalled) {
          client.instance.resize({
            height: "102px",
          });
        }
        setChild(
          isInstalled ? (
            <Inbox client={client} />
          ) : (
            <SetupRequiredStateUI client={client} />
          )
        );
      }

      if (location === "overlay") {
        if (modalID === Constants.MODAL_IDS.POSTCREATE) {
          setChild(
            <CreatePostComponent
              client={client}
              categorys={instanceData.categorys}
              jwtToken={instanceData.data}
            />
          );
        }

        if (modalID === Constants.MODAL_IDS.SEARCHPOST) {
          setChild(
            <ModalContent
              client={client}
              searchValue={instanceData.searchValue}
              categorys={instanceData.categorys}
              jwtToken={instanceData.jwtToken}
            />
          );
        }

        if (modalID === Constants.MODAL_IDS.POST_CREATE) {
          setChild(
            <CreatePostComponent
              client={client}
              categorys={instanceData.categorys}
              jwtToken={instanceData.jwtToken}
              searchQuery={instanceData.searchValue}
            />
          );
        }
      }
    } catch (error) {
      console.error(Constants.NOTIFICATION_MESSAGES.SETHOME_ERROR, error);
    }
  };

  return <div>{child}</div>;
};

export default App;
