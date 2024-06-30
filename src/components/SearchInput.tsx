import React from "react";
import LanguageFilter from "./LanguageFilter";

export interface SearchInputI {
  onLanguageChange: (language: string) => void;
  onSearchStringChange: (searchString: string) => void;
}

export default function SearchInput(props: SearchInputI) {
  return (
    <div>
      <div className={"sm:w-full lg:w-1/2 mx-auto"}>
        <input
          className="shadow appearance-none border border-blue-950 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full py-2 px-3 mb-3 "
          id="filter-input"
          type="text"
          placeholder="filter issues"
          onChange={(e) => props.onSearchStringChange(e.target.value)}
        />
      </div>
      <LanguageFilter onLanguageChange={props.onLanguageChange} />
    </div>
  );
}
