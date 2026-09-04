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
          className="border border-[#d0d7de] rounded-md text-[#1f2328] leading-tight focus:outline-none focus:border-[#0969da] focus:shadow-[inset_0_0_0_3px_rgba(9,105,218,0.3)] w-full py-2 px-3 text-sm bg-white transition-all placeholder:text-[#6e7781]"
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
