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
    <div className="w-full">
      <Select
        options={programmingLanguages}
        isMulti
        placeholder={strings.searchLanguages}
        className="w-full text-sm"
        onChange={(langs) => handleSearchChange(langs)}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#1e3a8a" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 2px rgba(30, 58, 138, 0.15)" : undefined,
            padding: "2px",
            backgroundColor: "#ffffff",
          }),
        }}
      />
    </div>
  );
}

