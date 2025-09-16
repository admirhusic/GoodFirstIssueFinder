import React, { useEffect, useRef } from "react";
import { GitHubIssue, GitHubUser } from "../types";
import { strings } from "../strings";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popover from "./Popover";
import UserProfilePopoverContent from "./popover/UserProfilePopoverContent";
import StarIcon from "../icons/StartIcon";
import HeartIcon from "../icons/HeartIcon";
import IssueOpenedIcon from "../icons/IssueOpenedIcon";
import { useFavorites } from "../hooks/useFavorites";

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

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();


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
  function langDotClass(lang?: string | null) {
    return "inline-block h-2 w-2 rounded-full bg-gray-400";
  }
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
           <ul className="mx-auto max-w-5xl">
            {issues?.map((issue, idx) => {
              const [_, owner = "", repo = ""] = issue.html_url.split("github.com/");
              const profile = owner?.split("/")[0] || "";
              const repoName = repo?.split("/")[0] || "";

              return (
                <li key={issue.html_url + idx} className="mb-3">
                  <div
                    className={[
                      "group relative w-full rounded-lg border bg-white",
                      "shadow-sm hover:shadow transition-shadow",
                      "ring-0 hover:ring-1 hover:ring-gray-200",
                    ].join(" ")}
                  >
                    {/* Top header row: owner/repo + star button */}
                    <div className="flex items-start justify-between gap-4 px-4 pt-3">
                      <div className="min-w-0">
                        <div className="flex items-center text-sm">
                          <Popover trigger="hover" content={UserProfilePopoverContent(issue)}>
                            <a
                              className="truncate font-medium hover:underline"
                              target="_blank"
                              rel="noreferrer"
                              href={`https://github.com/${profile}`}
                            >
                              {profile}
                            </a>
                          </Popover>

                          <span className="mx-1 text-gray-400">/</span>

                          <a
                            className="truncate font-medium hover:underline"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://github.com/${profile}/${repoName}`}
                          >
                            {repoName}
                          </a>
                        </div>
                      </div>

                      {/* Star action (right) */}

                      <div>

                      <button
                      type="button"
                      onClick={() =>
                        isFavorite(issue) ? removeFavorite(issue) : addFavorite(issue)
                      }
                      aria-label="Toggle Favorite"
                      className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium ${
                        isFavorite(issue)
                          ? "text-red-500 hover:bg-red-50 active:bg-red-100"
                          : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      <HeartIcon />
                      <span>{isFavorite(issue) ? "Unfavorite" : "Favorite"}</span>
                    </button>

                      <button
                        type="button"
                        aria-label="Star repository"
                        className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium
                        hover:bg-gray-50 active:bg-gray-100"
                        >
                        <StarIcon />
                        <span>Star</span>
                        {typeof issue.repository_stars === "number" && (
                          <span className="tabular-nums text-gray-600">{issue.repository_stars}</span>
                        )}
                      </button>
                    </div>
                        </div>

                    {/* Issue title row */}
                    <div className="mt-1 flex items-center gap-2 px-4">
                      <IssueOpenedIcon className="shrink-0 text-green-600" />
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={issue.html_url}
                        className="truncate font-semibold leading-6 text-gray-900 hover:text-blue-600"
                        title={issue.title}
                      >
                        {issue.title}
                      </a>
                    </div>

                    {/* Optional description */}
                    {issue.body && (
                      <p className="mt-1 line-clamp-2 px-8 pr-4 text-sm text-gray-700">
                        {issue.body}
                      </p>
                    )}

                    {/* Meta row: assignees, language, updated */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 px-4 pb-3">
                      {/* Assignees */}
                      {issue.assignees?.length ? (
                        <div className="flex items-center">
                          {issue.assignees.map((a, i) => (
                            <img
                              key={i}
                              src={a.avatar_url}
                              alt=""
                              className={[
                                "h-5 w-5 rounded-full ring-2 ring-white",
                                i ? "-ml-2" : "",
                              ].join(" ")}
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-600">
                            {issue.assignees.length} assignee{issue.assignees.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-green-600">{strings.NoAssignee}</span>
                      )}

                      {/* Separator dot */}
                      <span className="hidden sm:inline text-gray-300">•</span>

                      {/* Language */}
                      {issue.repository_language && (
                        <span className="flex items-center gap-2 text-xs text-gray-700">
                          <span className={langDotClass(issue.repository_language)} />
                          {issue.repository_language}
                        </span>
                      )}

                      {/* Updated */}
                      {issue.updated_at && (
                        <>
                          <span className="hidden sm:inline text-gray-300">•</span>
                          <span className="text-xs text-gray-600">
                            {strings.updatedOn} {new Date(issue.updated_at).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
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
