import { strings } from "../strings";
import Select, { MultiValue } from "react-select";

export interface LanguageFilterI {
  onLanguageChange: (languages: string[]) => void;
}

interface ProgrammingLanguage {
  value: string,
  label: string
}

export default function LanguageFilter(props: LanguageFilterI) {
  // TODO: Increase the list of languages
  const languagesOptions =
    [
      { value: 'angular', label: 'Angular' },
      { value: 'c', label: 'C' },
      { value: 'c#', label: 'C#' },
      { value: 'c++', label: 'C++' },
      { value: 'codeigniter', label: 'Codeigniter' },
      { value: 'java', label: 'Java' },
      { value: 'javascript', label: 'Javascript' },
      { value: 'kotlin', label: 'Kotlin' },
      { value: 'laravel', label: 'Laravel' },
      { value: 'php', label: 'PHP' },
      { value: 'python', label: 'Python' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' }
    ]

  const handleSearchChange = (languages: MultiValue<ProgrammingLanguage>) => {
    const mappedValues = languages.map((lang) => lang.value)
    props.onLanguageChange(mappedValues)
  };


  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto mb-3 flex flex-col items-start justify-start">

      <Select options={languagesOptions} isMulti placeholder={strings.searchLanguages} className="w-full" onChange={(langs) => handleSearchChange(langs)} />
    </div>
  );
}

