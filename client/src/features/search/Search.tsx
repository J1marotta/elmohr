import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchQuery, SetQuery, ClearQuery } from "../search/searchSlice";

export const Search: React.FC = () => {
  const query = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  return (
    <div>
      <label htmlFor="input" />
      <input
        id="input"
        autoFocus
        placeholder="Search for..."
        value={query}
        onChange={({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>): void => {
          dispatch(SetQuery(value));
        }}
      ></input>
    </div>
  );
};
