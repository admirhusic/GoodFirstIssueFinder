import React, { useEffect, useState } from "react";
import "./App.css";
import apiService from "./services/apiServices";
import { GitHubIssue } from "./types";
import Navbar from "./components/Navbar";
import IssueList from "./components/IssueList";
import SearchInput from "./components/SearchInput";
import { strings } from "./strings";
import RefreshButton from "./components/RefreshButton";

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
  const [language, setLanguage] = useState<string | null>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(true);

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
      setIsLoading(false);
    } else {
      if (issues) {
        setError("");
        const newIssues = issues.concat(newData.items || []);
        setIssues(newIssues);
      } else {
        setIssues(newData.items);
      }
      setTotalPages(newData.total_count);
    }
  };

  useEffect(() => {
    getData(null, null, currentPage).then(() => {
      setIsLoadingFullPage(false);
    });
  }, []);

  const onLanguageChange = (language: string) => {
    setLanguage(language);
    getData(language, searchString, currentPage);
  };

  const onSearchInputChange = (searchString: string) => {
    setSearchString(searchString);
    getData(language, searchString, currentPage);
  };

  const onRefreshButtonClick = () => {
    getData(language, searchString, currentPage);
  };

  const loadNewData = () => {
    if (isLoading) return;
    setCurrentPage((prevPage) => prevPage + 1);
    getData(language, searchString, currentPage);
  };

  const retry = () => {
    if (isLoading) return;
    getData(language, searchString, currentPage);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className={"container mx-auto flex flex-col pt-[50px]"}>
          <SearchInput
            onLanguageChange={onLanguageChange}
            onSearchStringChange={onSearchInputChange}
          />
          <div
            className={
              "flex flex-row sm:w-full md:w-1/2 lg:w-1/2 mx-auto justify-end align-middle items-end mb-2"
            }
          >
            <RefreshButton
              isAnimating={isLoading}
              onClick={onRefreshButtonClick}
            />
          </div>
          <IssueList
            isLoadingFullPage={isLoadingFullPage}
            isLoading={isLoading}
            error={error}
            issues={issues}
            totalPages={totalPages}
            onReachedBottom={loadNewData}
            currentPage={currentPage}
            onRetry={retry}
          />
        </div>
      </div>
    </>
  );
}

export default App;
