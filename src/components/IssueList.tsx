import React, { useEffect, useRef, useState } from "react";
import { GitHubIssue, GitHubUser } from "../types";
import { IssueOpenedIcon, StarIcon } from "@primer/octicons-react";
import { strings } from "../strings";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IssueListI {
  issues: GitHubIssue[] | null;
  isLoading: Boolean;
  isLoadingFullPage: Boolean;
  error: string;
  totalPages: number;
  onReachedBottom: () => void;
  currentPage: number;
  onRetry: () => void;
}

export default function IssueList(props: IssueListI) {
  const {
    issues,
    isLoading,
    isLoadingFullPage,
    error,
    onReachedBottom,
    currentPage,
    onRetry,
  } = props;
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        onReachedBottom();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [onReachedBottom]);

  const onRetryButtonClick = () => {
    onRetry();
  };

  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/2 mx-auto rounded">
      {isLoadingFullPage ? (
        <div className="flex flex-col justify-center items-center">
          <div role="status">
            <FontAwesomeIcon
              size={"xl"}
              className={"animate-spin-slow"}
              icon={faCircleNotch}
            />
          </div>
        </div>
      ) : error && currentPage === 1 ? (
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
                      className={`w-full ${key === 0 ? "border-t rounded-t" : "border-t-0"} border-r border-b border-l py-2 px-3 hover:bg-gray-100`}
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
                            {strings.noAssignee}
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
          {error && currentPage > 1 ? (
            <div
              className={
                "container flex flex-col justify-center items-center h-20 border"
              }
            >
              <p className={"pb-1"}>{strings.listItemError}</p>
              <button
                onClick={onRetryButtonClick}
                className={
                  "bg-blue-950 rounded py-1 px-3 text-white text-xs hover:bg-blue-800 cursor-pointer"
                }
              >
                {isLoading ? (
                  <FontAwesomeIcon
                    size={"sm"}
                    className={"animate-spin-slow"}
                    icon={faCircleNotch}
                  />
                ) : null}
                {strings.listItemReloadButtonLabel}
              </button>
            </div>
          ) : (
            <div
              ref={loaderRef}
              className={
                "container flex flex-col justify-center items-center text-center h-20 border-r border-l border-b rounded-b"
              }
            >
              <FontAwesomeIcon
                size={"xl"}
                className={"animate-spin-slow"}
                icon={faCircleNotch}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
