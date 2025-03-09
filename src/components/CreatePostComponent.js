import React, { useLayoutEffect, useState } from "react";
import "../cssfiles/modal.css";
import { FwSelect, FwSelectOption } from "@freshworks/crayons/react";
import { FwButton } from "@freshworks/crayons/react";
import { FwTextarea } from "@freshworks/crayons/react";
import { FwInput } from "@freshworks/crayons/react";
import showNotify from "../utils/showNotify";
import { Constants } from "../constants";
import {
  CreatePostContainer,
  TitleBox,
  DropDown,
  DescriptionBox,
} from "../css/createPostComponent";

export const CreatePostComponent = ({
  client,
  categorys,
  jwtToken,
  searchQuery,
}) => {
  const titleValue = searchQuery ? searchQuery : "";
  const [title, setTitle] = useState(titleValue);
  const [feedback, setFeedBack] = useState();
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState(categorys);
  const [titlerror, setTitlerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleCancelOnClick = () => {
    client.instance.close();
  };

  useLayoutEffect(() => {
    const fetchFirstUserMessage = async () => {
      try {
        const response = await client?.data?.get("conversation");
        const messages = response?.conversation?.messages;
        const userMessage = messages?.find(
          (message) => message?.actor_type === "User"
        );

        for (let i = 0; i < 3; i++) {
          if (userMessage.message_parts[i]?.text) {
            const userMessagePart = userMessage?.message_parts[i];
            const content = userMessagePart?.text?.content;
            setFeedBack(content);
            break;
          }
        }
      } catch (error) {
        showNotify(
          client,
          Constants.NOTIFICATION_TYPES.DANGER,
          Constants.NOTIFICATION_MESSAGES.CONVERSATION_ERROR
        );
      }
    };
    fetchFirstUserMessage();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.detail.value);
    setCategoryerror(false);
  };

  const handleInput = (e) => {
    setFeedBack(e.target.value);
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
    setTitlerror(false);
  };

  const createPost = (title, feedback, category) => {
    if (title.trim() === "") {
      setTitlerror(true);
    } else if (category === "") {
      setCategoryerror(true);
    } else {
      setIsButtonDisabled(true);
      client.request
        .invoke("createPost", {
          title,
          feedback,
          category,
          jwtToken,
        })
        .then(() => {
          showNotify(
            client,
            Constants.NOTIFICATION_TYPES.SUCCESS,
            Constants.NOTIFICATION_MESSAGES.POST_CREATED
          );
          setIsButtonDisabled(false);
          handleCancelOnClick();
        })
        .catch((error) => {
          // This catch block will catch errors that occur during the API call
          showNotify(
            client,
            Constants.NOTIFICATION_TYPES.ERROR,
            Constants.NOTIFICATION_MESSAGES.WENT_WRONG_ERROR
          );

          // You can also handle the error or log it here
          console.error("API call error:", error);
        });
    }
  };

  return (
    <div>
      <CreatePostContainer>
        <TitleBox>
          <FwInput
            className="title-input"
            onFwInput={handleTitleInput}
            value={title}
            placeholder="Title"
            required
            state={
              titlerror
                ? Constants.INPUT_TYPES.STATE.ERROR
                : Constants.INPUT_TYPES.STATE.NORMAL
            }
            error-text="Please provide a valid title"
            label="Title"
          />
        </TitleBox>
        <DescriptionBox>
          <FwTextarea
            rows={4}
            className="descript-box"
            resize="vertical"
            value={feedback}
            placeholder="Description"
            onFwInput={handleInput}
            label="Description"
          />
        </DescriptionBox>
        <DropDown>
          <FwSelect
            state={
              categoryerror
                ? Constants.INPUT_TYPES.STATE.ERROR
                : Constants.INPUT_TYPES.STATE.NORMAL
            }
            error-text="Please provide a valid board"
            required
            className="custom-option-color"
            value={category}
            label="Board"
            placeholder="Your choice"
            onFwChange={handleCategoryChange}
          >
            {categoryList.map((item) => (
              <FwSelectOption
                className="fw-color-smoke-700"
                key={item.id}
                value={item.id}
              >
                {item.name}
              </FwSelectOption>
            ))}
          </FwSelect>
        </DropDown>
      </CreatePostContainer>

      <Fwmodal-footer class="modal-foot">
        <FwButton color="secondary" onClick={handleCancelOnClick}>
          Cancel
        </FwButton>
        <FwButton
          loading={isButtonDisabled}
          style={{ opacity: isButtonDisabled ? 0.6 : 1 }}
          onClick={() => createPost(title, feedback, category)}
        >
          Create post
        </FwButton>
      </Fwmodal-footer>
    </div>
  );
};
