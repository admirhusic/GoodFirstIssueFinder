import React, { useState } from "react";

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
  const [selectedLang, setSelectedLang] = useState("");

  const handleLangSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
    props.onLanguageChange(e.target.value);
  };

  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto mb-3 flex flex-row items-start justify-start">
      <select
        className="shadow appearance-none border border-blue-950 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2 px-3"
        value={selectedLang}
        onChange={handleLangSelect}
      >
        <option disabled value="">
          Select a language
        </option>
        <option value="">All languages</option>
        {languages.map((lang, key) => (
          <option value={lang} key={key}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
