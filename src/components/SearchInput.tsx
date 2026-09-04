import React, { useCallback } from "react";
import LanguageFilter from "./LanguageFilter";
import { debounce } from "lodash";
import { strings } from "../strings";

export interface SearchInputI {
  onLanguageChange: (languages: string[]) => void;
  onSearchStringChange: (searchString: string) => void;
}

export default function SearchInput(props: SearchInputI) {
  const debouncedOnSearchStringChange = useCallback(
    debounce((value: string) => {
      props.onSearchStringChange(value);
    }, 500),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnSearchStringChange(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full">
        <input
          className="shadow-sm border border-gray-300 rounded-lg text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent w-full py-2.5 px-3.5 bg-white transition-all placeholder:text-gray-400"
          id="filter-input"
          type="text"
          placeholder={strings.filterIssuesPlaceholder}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full">
        <LanguageFilter onLanguageChange={props.onLanguageChange} />
      </div>
    </div>
  );
}
