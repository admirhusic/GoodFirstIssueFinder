import React, { useEffect, useState } from "react";
import "./App.css";
import apiService from "./services/apiServices";
import { GitHubIssue } from "./types";
import Navbar from "./components/Navbar";
import IssueList from "./components/IssueList";
import SearchInput from "./components/SearchInput";

interface GetDataFunction {
  (
    language: string | null,
    searchString: string | null,
    page: number | null,
  ): Promise<void>;
}

function App() {
  const [issues, setIssues] = useState<GitHubIssue[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lanugage, setLanguage] = useState<string | null>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getData: GetDataFunction = async (
    language = null,
    searchString = null,
  ) => {
    setIsLoading(true);
    const newData = await apiService.searchIssues(
      language,
      searchString,
      currentPage,
    );
    setIsLoading(false);
    if (newData.error) {
      setError(newData.error);
    } else {
      setIssues(newData.items);
      setTotalPages(newData.total_count);
    }
  };

  useEffect(() => {
    getData(null, null, currentPage);
  }, []);

  const onLanguageChange = (language: string) => {
    setLanguage(language);
    getData(language, searchString, currentPage);
  };

  const onSearchInputchange = (searchString: string) => {
    setSearchString(searchString);
    getData(lanugage, searchString, currentPage);
  };

  const onChangeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData(lanugage, searchString, currentPage);
  }, [currentPage]);

  return (
    <>
      <div>
        <Navbar />
        <div className={"container mx-auto flex flex-col pt-[50px]"}>
          <SearchInput
            onLanguageChange={onLanguageChange}
            onSearchStringChange={onSearchInputchange}
          />
          <IssueList
            isLoading={isLoading}
            error={error}
            issues={issues}
            currentPage={currentPage}
            totalPages={totalPages}
            onChangeCurrentPage={onChangeCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

export default App;
