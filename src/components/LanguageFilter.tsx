import React, { useState } from "react";
import { strings } from "../strings";

// TODO: The plan
// Firstly I need to add more languages (dynamically if i could)
// Then be able to search through them
// When picking a language it should have like a small component with a small x button to delete the suggestion
// then query GitHub after selecting those languages

export interface LanguageFilterI {
  onLanguageChange: (language: string) => void;
}

export default function LanguageFilter(props: LanguageFilterI) {
  const languages = [
    "Javascript",
    "Java",
    "Kotlin",
    "C",
    "C++",
    "C#",
    "PHP",
    "Laravel",
    "Codeigniter",
    "React",
    "Vue",
    "Angular",
    "Python",
  ].sort();
  // const [selectedLang, setSelectedLang] = useState("");
  const [searchQuery, setSearchQuery] = useState("")


  const filteredLanguages = languages.filter((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLangSelect = (lang: string) => {
    // setSelectedLang(e.target.value);
    props.onLanguageChange(lang);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  };

  // TODO: STYLE NEEDED
  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto mb-3 flex flex-row items-start justify-start">

      <input type="text" name="language" id="language" value={searchQuery} onChange={handleSearchChange} />

      {searchQuery && (
        <div className="">
          {filteredLanguages.map(lang => (
            <div key={lang} onClick={() => handleLangSelect(lang)}>
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
