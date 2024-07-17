import React, { useState } from "react";
import { strings } from "../strings";
import SelectedLanguage from "./SelectedLanguage";

export interface LanguageFilterI {
  onLanguageChange: (language: string, action: 'add' | 'delete') => void;
  currentLanguages: Set<string>
}

export default function LanguageFilter(props: LanguageFilterI) {
  // TODO: Increase the list of languages
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
  const [searchQuery, setSearchQuery] = useState("")
  const currentLanguagesArray = Array.from(props.currentLanguages)


  const filteredLanguages = languages.filter((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLangSelect = (lang: string) => {
    if (props.currentLanguages.has(lang)) return
    setSearchQuery("")
    props.onLanguageChange(lang, 'add');
  };

  const handleLangDeletion = (lang: string) => {
    if (!props.currentLanguages.has(lang)) return
    props.onLanguageChange(lang, 'delete')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  };

  // TODO: STYLE NEEDED
  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto mb-3 flex flex-row items-start justify-start">

      {currentLanguagesArray.length > 0 && <div>
        {currentLanguagesArray.map(lang => (
          <SelectedLanguage key={lang} language={lang} onLanguageDeletion={() => handleLangDeletion(lang)} />
        ))}
      </div>}

      <input type="text" name="language" id="language" value={searchQuery} onChange={handleSearchChange} placeholder={strings.searchLanguages} />

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
