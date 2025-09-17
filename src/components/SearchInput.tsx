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
    <div>
      <div className={"w-[95vw] sm:w-full lg:w-1/2 md:w-1/2 mx-auto"}>
        <input
          className="shadow appearance-none border border-blue-950 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full py-2 px-3 mb-3 "
          id="filter-input"
          type="text"
          placeholder={strings.filterIssuesPlaceholder}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-[95vw] sm:w-full md:w-full mx-auto">
      <LanguageFilter onLanguageChange={props.onLanguageChange} />
      </div>
      
    </div>
  );
}
