import React from "react";
import axios from "axios";

import { SetUsers, SetError, SetLoading, SetReady } from "./MetaSlice";

import { selectSearchQuery } from "../search/searchSlice";
import { store } from "../../app/store";

export const fetchData = async () => {
  const { dispatch } = store;

  dispatch(SetLoading());

  const query = store.getState().search.query;
  const baseUrl = `http://localhost:4000`;
  const searchUrl = `${baseUrl}/search?q=${query}`;
  // const usersUrl = `${baseUrl}/users/${userId}/${ScreenName}`
  const url = searchUrl;
  console.log({ url });

  try {
    const results = await axios.request({
      method: "get",
      url,
    });
    console.log({ results });
    dispatch(SetUsers(results.data));
  } catch (e) {
    console.error({ e });
    dispatch(SetError("error"));
    throw new Error("Fetch Failed, check the API");
  } finally {
    dispatch(SetReady());
  }
};