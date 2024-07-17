interface SelectedLanguageI {
  language: string;
  onLanguageDeletion: (language: string) => void
}

export default function SelectedLanguage(props: SelectedLanguageI) {

  return (
    <div>
      <button onClick={() => props.onLanguageDeletion(props.language)}>Delete</button>
      <p>{props.language}</p>
    </div>
  )
}

