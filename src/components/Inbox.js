import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import "../cssfiles/modal.css";
import "@freshworks/crayons";
import openModal from "../utils/showModal";
import { Constants } from "../constants";
import plusicon from "../assets/plusicon.svg";
import showNotify from "../utils/showNotify";
import {
  SearchField,
  Input,
  StyledSpan,
  Button,
  CreatePost,
  PlusIcon,
} from "../css/inbox";

export const Inbox = ({ client }) => {
  const [searchValue, setSearchValue] = useState("");
  const [jwtToken, setJwtToken] = useState(data);
  const [categorys, setCategorys] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDivDisabled, setIsDivDisabled] = useState(false);
  let email;
  let name;
  let data = "";

  const handleClickCreatePost = async () => {
    fetchData(client);
  };
  const fetchData = async (client) => {
    try {
      const response = await client.data.get("user");
      const userData = response?.user;
      if (userData?.email) {
        email = userData.email;
        name = userData.first_name;
        data = await generateToken();
        console.log(data);
        setJwtToken(data);
        if (data) {
          CreatePostModal(data);
        } else {
          showNotify(
            client,
            Constants.NOTIFICATION_TYPES.DANGER,
            Constants.NOTIFICATION_MESSAGES.SSO_INVALID
          );
        }
      } else {
        showNotify(
          client,
          Constants.NOTIFICATION_TYPES.DANGER,
          Constants.NOTIFICATION_MESSAGES.EMAIL_REQUIRED
        );
      }
    } catch (error) {
      showNotify(
        client,
        Constants.NOTIFICATION_TYPES.DANGER,
        Constants.NOTIFICATION_MESSAGES.ERROR
      );
    }
  };

  const fetchingCategoryData = async () => {
    try {
      const response = await client.request.invoke("category", {});
      const categoryData = response?.response?.buckets;

      if (categoryData) {
        setCategorys(categoryData);
      }
    } catch (error) {
      showNotify(
        client,
        Constants.NOTIFICATION_TYPES.DANGER,
        Constants.NOTIFICATION_MESSAGES.CATEGORY_ERROR
      );
    }
  };

  useLayoutEffect(() => {
    fetchingCategoryData();
  }, []);

  const fetchUserData = async (client) => {
    try {
      const response = await client.data.get("user");
      const userData = response?.user;
      email = userData.email;
      name = userData.first_name;
      token = await generateToken();
      setJwtToken(token);
    } catch (error) {}
  };
  const generateToken = async () => {
    let token = "";
    if (name && email) {
      try {
        const response = await client.request.invoke("jwt_token_generation", {
          name,
          email,
        });
        token = response?.response;
      } catch (err) {
        showNotify(
          client,
          Constants.NOTIFICATION_TYPES.DANGER,
          Constants.NOTIFICATION_MESSAGES.SSO_INVALID
        );
      }
    }
    return token;
  };

  const CreatePostModal = async (data) => {
    setIsDivDisabled(true);
    setTimeout(() => {
      setIsDivDisabled(false);
    }, 3000);
    openModal(
      client,
      "showModal",
      Constants.MODAL_TITLES.POST_CREATE,
      "index.html",
      {
        modalID: Constants.MODAL_IDS.POSTCREATE,
        categorys,
        data,
      }
    );
  };

  const SearchPostModal = async () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
    openModal(
      client,
      "showModal",
      Constants.MODAL_TITLES.HELLONEXT,
      "index.html",
      {
        modalID: Constants.MODAL_IDS.SEARCHPOST,
        searchValue,
        categorys,
        jwtToken
      }
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isButtonDisabled) {
      fetchUserData(client);
      SearchPostModal();
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const isInputEmpty = searchValue.trim() === "" || isButtonDisabled;

  return (
    <>
      <SearchField>
        <Input
          placeholder="Search post"
          value={searchValue}
          onInput={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          style={{
            cursor: isInputEmpty ? "not-allowed" : "pointer",
          }}
          disabled={isInputEmpty}
          onClick={SearchPostModal}
        >
          Search
        </Button>
      </SearchField>
      <div onClick={handleClickCreatePost}>
        <PlusIcon src={plusicon} />
        <CreatePost disabled={isDivDisabled}>
          <StyledSpan>Create post</StyledSpan>
        </CreatePost>
      </div>
    </>
  );
};
