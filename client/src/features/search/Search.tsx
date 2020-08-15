import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchQuery, SetQuery, ClearQuery } from "../search/searchSlice";
import { fetchData } from "../Meta/FetchData";

export const Search: React.FC = () => {
  const query = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          fetchData();
          console.log(query);
        }}
      >
        <label htmlFor="input">Search Twitter </label>
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
        />
        <button type="submit"> Search! </button>
        <button type="button" onClick={() => dispatch(ClearQuery())}>
          Clear
        </button>
      </form>
    </div>
  );
};
