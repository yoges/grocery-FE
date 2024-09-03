"use client";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({ setValue }) => {
  //debounce is to wait for the user to finish typing before query api
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
    },
    // delay in ms
    1000
  );
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => debounced(e.target.value)}
    />
  );
};

export default SearchBar;
