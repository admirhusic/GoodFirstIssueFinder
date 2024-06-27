import React, {useEffect, useState} from 'react';
import './App.css';
import apiService from "./services/apiServices";
import {GitHubIssue} from "./types";
import Navbar from "./components/Navbar";
import IssueList from "./components/IssueList";
import SearchInput from "./components/SearchInput";

function App() {

    const [issues, setIssues] = useState<GitHubIssue[]>()

    async function getData() {
        const newData = await apiService.searchIssues()

        if (newData.items) {
            setIssues(newData.items)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div>
                <Navbar/>
                <div className={"container mx-auto flex flex-col p-3"}>
                    <SearchInput/>
                    <IssueList issues={issues}/>
                </div>
            </div>
        </>
    );
}

export default App;
