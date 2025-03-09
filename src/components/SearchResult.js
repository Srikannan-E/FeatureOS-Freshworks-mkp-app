import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { FwInput } from "@freshworks/crayons/react";
import upvoteclick from "../assets/upvoteclick.svg";
import noresults from "../assets/noresults.svg";
import tryagain from "../assets/nores.svg";
import { formatShortDate } from "../utils/formatDate";
import Loader from "../state/Loader";
import { Constants } from "../constants";
import "../cssfiles/modal.css";
import openModal from "../utils/showModal";
import showNotify from "../utils/showNotify";
import {
  ScrollContainer,
  SearchField,
  Searchdescript,
  Noposts,
  Nopostsvg,
  NopostsDescript,
  CreatePost,
  FeedbackDiv,
  FeedbackDetails,
  FeedbackTitle,
  DescriptionDiv,
  FeedbackDescription,
  FeedbackNextDescription,
  Upvote,
  VoteCount,
  StatusDiv,
  Status,
  FeedBackDate,
  Datespan,
  FeedbackContainer,
} from "../css/SearchResult";

export const SearchResult = ({
  client,
  setInboxValue,
  handleContent,
  inboxvalue,
  input = null,
  categorys,
  jwtToken,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  let name;
  let email;

  const fetchUserData = async (client) => {
    try {
      const response = await client.data.get("user");
      const userData = response?.user;
      email = userData.email;
      name = userData.first_name;
      if (email) {
        setIsEmail(true);
      }
    } catch (error) {
      showNotify(
        client,
        Constants.NOTIFICATION_TYPES.DANGER,
        Constants.NOTIFICATION_MESSAGES.ERROR
      );
    }
  };

  const createPost = async () => {
    if (isEmail) {
      if (!isDisabled) {
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 3000);
        await openModal(
          client,
          "showModal",
          Constants.MODAL_TITLES.POST_CREATE,
          "index.html",
          {
            modalID: Constants.MODAL_IDS.POST_CREATE,
            categorys,
            jwtToken,
            searchValue,
          }
        );
      }
    } else {
      showNotify(
        client,
        Constants.NOTIFICATION_TYPES.DANGER,
        Constants.NOTIFICATION_MESSAGES.EMAIL_REQUIRED
      );
    }
  };

  const results = async (item) => {
    await handleContent(Constants.COMPONENT_IDS.RESULT, searchValue, { item });
  };

  useLayoutEffect(() => {
    const filtered = data.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchValue, data]);

  const handleInputChange = (e) => {
    if (e) {
      const { value } = e.detail;
      setSearchValue(value);
    }
  };

  const fetchData = async () => {
    if (!data.length) {
      setFetch(false);
      setIsLoading(true);
      try {
        let i = 1;
        let mergedFeedbackArray = [];
        do {
          await client.request
            .invoke("searchPost", { pageNumber: i })
            .then((response) => {
              const datas = response.response.feature_requests;
              mergedFeedbackArray = mergedFeedbackArray.concat(datas);
              i++;
            });
        } while (mergedFeedbackArray.length === 100);
        setData(() => mergedFeedbackArray);
      } catch (error) {
        setIsLoading(false);
        setFetch(true);
      } finally {
        setIsLoading(false);
      }
      setInboxValue(inboxvalue);

      if (!searchValue) {
        if (input) {
          setSearchValue(input);
        } else {
          setSearchValue(inboxvalue);
        }
      }
    }
  };

  useLayoutEffect(() => {
    fetchData();
    fetchUserData(client);
  }, []);

  return (
    <ScrollContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchField>
            <FwInput
              className="search-input"
              value={searchValue}
              onFwInput={handleInputChange}
              onFwInputClear={handleInputChange}
              iconLeft="search"
              state="normal"
              clearInput
            />
          </SearchField>
          {searchValue && searchValue.trim() !== "" ? (
            searchResults.length > 0 ? (
              <>
                <Searchdescript className="search-descript">
                  Search results for "{searchValue}" ({searchResults.length})
                </Searchdescript>
                <FeedbackContainer>
                  {searchResults.map((item) => (
                    <FeedbackDiv onClick={() => results(item)} key={item.id}>
                      <FeedbackDetails>
                        <FeedbackTitle>{item.title}</FeedbackTitle>
                        <DescriptionDiv>
                          <FeedbackDescription>
                            {item.preview}
                          </FeedbackDescription>
                        </DescriptionDiv>
                        <FeedbackNextDescription>
                          <Upvote src={upvoteclick} alt="icon" />
                          <VoteCount>Vote ({item.votes_count})</VoteCount>
                          <StatusDiv>
                            <Status>{item.status}</Status>
                          </StatusDiv>
                          <FeedBackDate>
                            Created on
                            <Datespan>
                              {formatShortDate(item.created_at)}
                            </Datespan>
                          </FeedBackDate>
                        </FeedbackNextDescription>
                      </FeedbackDetails>
                    </FeedbackDiv>
                  ))}
                </FeedbackContainer>
              </>
            ) : (
              <>
                {fetch ? (
                  <Noposts>
                    <Nopostsvg src={tryagain} alt="icon" />
                    <NopostsDescript>
                      Something went wrong!
                      <br />
                      <CreatePost onClick={fetchData}>Try again</CreatePost>
                    </NopostsDescript>
                  </Noposts>
                ) : (
                  <>
                    <Searchdescript>
                      No results for "{searchValue}"
                    </Searchdescript>
                    <Noposts>
                      <Nopostsvg src={noresults} alt="icon" />
                      <NopostsDescript>
                        No matching posts found!
                        <br />
                        <CreatePost onClick={createPost} disabled={isDisabled}>
                          Create post
                        </CreatePost>
                      </NopostsDescript>
                    </Noposts>
                  </>
                )}
              </>
            )
          ) : null}
        </>
      )}
    </ScrollContainer>
  );
};
