import React from "react";
import { Constants } from "../constants";

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const weekdayFormatter = new Intl.DateTimeFormat(Constants.DATE_TEXTS.EN_US, {
    weekday: Constants.DATE_TEXTS.LONG,
  });
  const monthFormatter = new Intl.DateTimeFormat(Constants.DATE_TEXTS.EN_US, {
    month: Constants.DATE_TEXTS.SHORT,
  });

  const weekday = weekdayFormatter.format(date);
  const month = monthFormatter.format(date);
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${weekday}, ${day} ${month} ${year}`;

  return <div> {formattedDate}</div>;
};

export const formatShortDate = (dateString) => {
  const date = new Date(dateString);

  const weekdayFormatter = new Intl.DateTimeFormat(Constants.DATE_TEXTS.EN_US, {
    weekday: Constants.DATE_TEXTS.SHORT,
  });
  const monthFormatter = new Intl.DateTimeFormat(Constants.DATE_TEXTS.EN_US, {
    month: Constants.DATE_TEXTS.SHORT,
  });

  const weekday = weekdayFormatter.format(date);
  const month = monthFormatter.format(date);
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = ` ${weekday}, ${day} ${month} ${year}`;

  return <div> {formattedDate}</div>;
};
