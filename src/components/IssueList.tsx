import React from "react";
import { GitHubIssue, GitHubUser } from "../types";
import { ReactComponent as LoadingIndicatorSVG } from "../svg/loading_indicator.svg";
import Pagination from "./Pagination";
import { IssueOpenedIcon, StarIcon } from "@primer/octicons-react";
import { strings } from "../strings";

interface IssueListI {
  issues: GitHubIssue[] | null;
  isLoading: Boolean;
  error: string;
  currentPage: number;
  totalPages: number;
  onChangeCurrentPage: (page: number) => void;
}

export default function IssueList(props: IssueListI) {
  const { issues, isLoading, error } = props;
  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto rounded">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <div role="status">
            <LoadingIndicatorSVG />
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      ) : issues?.length === 0 ? (
        <div className="text-center">
          <p>{strings.noIssuesFound}</p>
        </div>
      ) : (
        <div className={"pb-6"}>
          <ul>
            {issues?.length &&
              issues?.map((issue, key: number) => {
                const profile = `${issue.html_url.split("/")[3]}`;
                const repo = `${issue.html_url.split("/")[4]}`;

                return (
                  <li key={key} className={""}>
                    <div
                      className={`w-full ${key === 0 ? "border-t rounded" : "border-t-0"} border-r border-b border-l py-2 px-3 hover:bg-gray-100`}
                    >
                      <div className={"flex flex-row"}>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={`https://github.com/${profile}`}
                        >
                          <span className={"hover:bg-gray-200 rounded px-1"}>
                            {profile}
                          </span>
                        </a>

                        <span className={"mx-1"}>{"/"}</span>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={`https://github.com/${profile}/${repo}`}
                        >
                          <span className={"hover:bg-gray-200 rounded px-1"}>
                            {repo}
                          </span>
                        </a>

                        <span
                          className={
                            "rounded bg-gray-100 text-sm px-1 flex flex-row justify-center align-middle items-center border"
                          }
                        >
                          <StarIcon /> {issue.repository_stars}
                        </span>
                      </div>
                      <div className={"flex flex-row items-center"}>
                        <span className={"mr-1"}>
                          <IssueOpenedIcon fill={"green"} />
                        </span>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={issue.html_url}
                        >
                          <span className={"font-bold hover:text-blue-500"}>
                            {issue.title}
                          </span>
                        </a>
                      </div>
                      {!issue.assignees.length ? (
                        <div key={key} className={"flex flex-row items-center"}>
                          <span className={"text-xs text-green-500"}>
                            No assignee yet
                          </span>
                        </div>
                      ) : (
                        <div>
                          {issue.assignees.map(
                            (assign: GitHubUser, key: number) => (
                              <img
                                key={key}
                                className={
                                  "rounded-xl w-[25px] h-[25px] mr-1 inline"
                                }
                                src={assign.avatar_url}
                                alt=""
                              />
                            ),
                          )}
                        </div>
                      )}
                      {issue.repository_language !== null ? (
                        <>
                          <div className={"mt-1"}>
                            <span
                              className={
                                "bg-blue-950 rounded text-white text-xs font-light px-3 py-1"
                              }
                            >
                              {issue.repository_language}
                            </span>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </li>
                );
              })}
          </ul>
          <Pagination
            currentPage={props.currentPage}
            onChangeCurrentPage={props.onChangeCurrentPage}
            totalPages={props.totalPages}
          />
        </div>
      )}
    </div>
  );
}
