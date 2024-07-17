import React, { useState } from "react";
import { strings } from "../strings";
import SelectedLanguage from "./SelectedLanguage";

// TODO: The plan
// Firstly I need to add more languages (dynamically if i could)
// Then be able to search through them
// When picking a language it should have like a small component with a small x button to delete the suggestion
// then query GitHub after selecting those languages

export interface LanguageFilterI {
  onLanguageChange: (language: string, action: 'add' | 'delete') => void;
  currentLanguages: string[]
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
    props.onLanguageChange(lang, 'add');
  };

  const handleLangDeletion = (lang: string) => {
    props.onLanguageChange(lang, 'delete')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  };

  // TODO: STYLE NEEDED
  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto mb-3 flex flex-row items-start justify-start">

      {props.currentLanguages.length > 0 && <div>
        {props.currentLanguages.map(lang => (
          <SelectedLanguage key={lang} language={lang} onLanguageDeletion={() => handleLangDeletion(lang)} />
        ))}
      </div>}

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
