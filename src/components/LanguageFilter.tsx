import { programmingLanguages } from "../constants";
import { strings } from "../strings";
import Select, { MultiValue } from "react-select";

export interface LanguageFilterI {
  onLanguageChange: (languages: string[]) => void;
}

export default function LanguageFilter(props: LanguageFilterI) {
  const handleSearchChange = (languages: MultiValue<typeof programmingLanguages[number]>) => {
    const mappedValues = languages.map((lang) => lang.value);
    props.onLanguageChange(mappedValues);
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
            borderRadius: "6px",
            borderColor: state.isFocused ? "#0969da" : "#d0d7de",
            boxShadow: state.isFocused
              ? "inset 0 0 0 3px rgba(9, 105, 218, 0.3)"
              : "none",
            padding: "2px",
            backgroundColor: "#ffffff",
            "&:hover": {
              borderColor: state.isFocused ? "#0969da" : "#b1bac4",
            },
          }),
        }}
      />
    </div>
  );
}
