import React, { useEffect, useRef, useState } from "react";
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
    languages: string[] | null,
    searchString: string | null,
    currentPage: number | null,
    scroll?: boolean
  ): Promise<void>;
}

function App() {
  const [issues, setIssues] = useState<GitHubIssue[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [languages, setLanguages] = useState<string[] | null>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(true);
  const isMounted = useRef(false)

  const getData: GetDataFunction = async (
    languages = null,
    searchString = null,
    currentPage,
    scroll = false
  ) => {
    setIsLoading(true);
    const newData = await apiService.searchIssues(
      languages,
      searchString,
      currentPage,
    );
    setIsLoading(false);
    if (newData.error) {
      setError(newData.error);
      setIsLoading(false);
    } else {
      setError("");
      if (scroll) {
        setIssues((issues) => issues!.concat(newData.items || []));
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

  useEffect(() => {
    if (isMounted.current) {
      getData(languages, searchString, currentPage)
    } else { isMounted.current = true }
  }, [languages, searchString])

  const onLanguageChange = (languages: string[]) => {
    setLanguages(languages)
  };

  const onSearchInputChange = (searchString: string) => {
    setSearchString(searchString);
  };

  const onRefreshButtonClick = () => {
    getData(languages, searchString, currentPage);
  };

  const loadNewData = () => {
    if (isLoading) return;
    setCurrentPage((prevPage) => prevPage + 1);
    getData(languages, searchString, currentPage, true);
  };

  const retry = () => {
    if (isLoading) return;
    getData(languages, searchString, currentPage, false);
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
