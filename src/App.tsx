import React, { useEffect, useState } from "react";
import "./App.css";
import apiService from "./services/apiServices";
import { GitHubIssue } from "./types";
import Navbar from "./components/Navbar";
import IssueList from "./components/IssueList";
import SearchInput from "./components/SearchInput";

function App() {
  const [issues, setIssues] = useState<GitHubIssue[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function getData() {
    setIsLoading(true);
    const newData = await apiService.searchIssues();
    setIsLoading(false);
    if (newData.error) {
      setError(newData.error);
    } else {
      setIssues(newData.items);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className={"container mx-auto flex flex-col pt-[50px]"}>
          <SearchInput />
          <IssueList isLoading={isLoading} error={error} issues={issues} />
        </div>
      </div>
    </>
  );
}

export default App;
