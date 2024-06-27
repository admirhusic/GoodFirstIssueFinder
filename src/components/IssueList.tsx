import React from "react";
import {GitHubIssue} from "../types";
import {ReactComponent as OpenIssueSVG} from '../svg/open_issue.svg'
import Pagination from "./Pagination";

interface IssueListI {
    issues: GitHubIssue[] | undefined
}

export default function IssueList(props: IssueListI) {
    const {issues} = props
    return (
        <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto rounded">
            {issues !== undefined ?

                <div>
                    <ul>
                        {issues.length && issues.map((issue, key: number) => {


                            const profile = `${issue.html_url.split("/")[3]}`
                            const repo = `${issue.html_url.split("/")[4]}`

                            return (

                                <li className={""}>
                                    <div
                                        className={`w-full ${key === 0 ? "border-t rounded" : "border-t-0"} border-r border-b border-l py-2 px-3 hover:bg-gray-100`}>
                                        <div className={"flex flex-row"}>
                                            <a href="">
                                                <a key={key} target={"_blank"} rel="noreferrer"
                                                   href={`https://github.com/${profile}`}> <span
                                                    className={"hover:bg-gray-200 rounded px-1"}>{profile}</span></a>
                                            </a>
                                            <span className={"mx-1"}>{"/"}</span>
                                            <a href="">
                                                <a key={key} target={"_blank"} rel="noreferrer"
                                                   href={`https://github.com/${profile}/${repo}`}> <span
                                                    className={"hover:bg-gray-200 rounded px-1"}>{repo}</span></a>
                                            </a>
                                        </div>
                                        <div className={"flex flex-row items-center"}>
                                            <span className={"mr-1"}> <OpenIssueSVG fill={"green"}/></span>
                                            <a key={key} target={"_blank"} rel="noreferrer" href={issue.html_url}> <span
                                                className={"font-bold hover:text-blue-500"}>{issue.title}</span></a>
                                        </div>
                                        {!issue.assignees.length ? <div className={"flex flex-row items-center"}>
                                            <span className={"text-xs text-green-500"}>No assignee yet</span>
                                        </div> : <div>
                                            {issue.assignees.map((asign) => <img
                                                className={"rounded-xl w-[25px] h-[25px] mr-1 inline"}
                                                src={asign.avatar_url}
                                                alt=""/>)}
                                        </div>}
                                        <div className={"mt-1"}>
                                    <span
                                        className={"bg-blue-950 rounded text-white text-xs font-light px-3 py-1"}>Javascript</span>
                                        </div>
                                    </div>
                                </li>


                            )
                        })}
                    </ul>


                    <Pagination/>

                </div>


                : <div>

                    <p>List is undefined or null</p>

                </div>}
        </div>
    )
}