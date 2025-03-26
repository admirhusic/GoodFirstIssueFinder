import { programmingLanguages } from "../constants";
import { strings } from "../strings";
import Select, { MultiValue } from "react-select";

export interface LanguageFilterI {
  onLanguageChange: (languages: string[]) => void;
}

export default function LanguageFilter(props: LanguageFilterI) {
  const handleSearchChange = (languages: MultiValue<typeof programmingLanguages[number]>) => {
    const mappedValues = languages.map((lang) => lang.value)
    props.onLanguageChange(mappedValues)
  };


  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto mb-3 flex flex-col items-start justify-start">
      <Select options={programmingLanguages} isMulti placeholder={strings.searchLanguages} className="w-full" onChange={(langs) => handleSearchChange(langs)} />
    </div>
  );
}

