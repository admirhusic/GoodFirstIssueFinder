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

  useEffect(() => {
    document.title = strings.documentTitle;
  }, []);

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
        setIssues((issues) => {
          const existingIssues = issues || [];
          const existingUrls = new Set(existingIssues.map((issue) => issue.html_url));
          const newIssues = (newData.items || []).filter(
            (issue) => !existingUrls.has(issue.html_url),
          );
          return existingIssues.concat(newIssues);
        });
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
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getData(languages, searchString, nextPage, true);
  };

  const retry = () => {
    if (isLoading) return;
    getData(languages, searchString, currentPage, false);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-[#1f2328] flex flex-col">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12 flex flex-col gap-4">
        <SearchInput
          onLanguageChange={onLanguageChange}
          onSearchStringChange={onSearchInputChange}
        />
        <div className="flex w-full justify-between items-center px-0.5">
          <span className="text-xs text-[#57606a] font-medium">
            {issues && issues.length > 0
              ? `${totalPages ? totalPages.toLocaleString() : issues.length} issues found`
              : ""}
          </span>
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
      </main>
    </div>
  );
}

export default App;
