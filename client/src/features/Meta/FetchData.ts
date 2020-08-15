import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetData, SetError, SetLoading, SetReady } from "./MetaSlice";

import { selectSearchQuery } from "../search/searchSlice";

const fetchData = async () => {
  const dispatch = useDispatch();

  dispatch(SetLoading());

  const query = selectSearchQuery;
  const baseUrl = `http://localhost:4000`;
  const searchUrl = `${baseUrl}/search?q=${query}`;
  // const usersUrl = `${baseUrl}/users/${userId}/${ScreenName}`
  const url = searchUrl;

  try {
    const results = await axios.request({
      method: "get",
      url,
    });

    dispatch(SetData(results));
  } catch (e) {
    console.error(e);
    dispatch(SetError(e));
    throw new Error("Fetch Failed, check the API");
  } finally {
    dispatch(SetReady());
  }
};
