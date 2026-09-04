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

  return (
    <div className="w-full">
      {isLoadingFullPage ? (
        <div className="flex flex-col justify-center items-center py-16 text-[#57606a]">
          <div role="status" className="flex flex-col items-center gap-3">
            <FontAwesomeIcon
              size={"2x"}
              className={"animate-spin text-[#0969da]"}
              icon={faCircleNotch}
            />
            <span className="text-sm">Loading good first issues...</span>
          </div>
        </div>
      ) : error && currentPage === 1 ? (
        <div className="text-[#82071e] bg-[#ffebe9] border border-[#ffcecb] rounded-md p-6 text-center my-4">
          <p className="font-medium">{error}</p>
          <button
            onClick={onRetryButtonClick}
            className="mt-3 inline-flex items-center gap-2 bg-white border border-[#d0d7de] rounded-md py-[5px] px-4 text-[#24292f] text-xs font-medium hover:bg-[#f3f4f6] transition-colors"
          >
            {strings.listItemReloadButtonLabel}
          </button>
        </div>
      ) : issues?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-md border border-[#d0d7de] text-[#57606a]">
          <p>{strings.noIssuesFound}</p>
        </div>
      ) : (
        <div className="pb-6">
          <ul className="w-full space-y-3">
            {issues?.map((issue, idx) => {
              const urlParts = issue.html_url.split("/");
              const profile = urlParts[3] || "";
              const repoName = urlParts[4] || "";

              return (
                <li key={issue.html_url + idx} className="mb-3">
                  <div className="group relative w-full rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] transition-colors">
                    {/* Top header row: owner/repo + action buttons */}
                    <div className="flex items-start justify-between gap-4 px-4 pt-3">
                      <div className="min-w-0">
                        <div className="flex items-center text-sm">
                          <Popover trigger="hover" content={UserProfilePopoverContent(issue)}>
                            <a
                              className="truncate font-medium text-[#1f2328] hover:text-[#0969da] hover:underline transition-colors"
                              target="_blank"
                              rel="noreferrer"
                              href={`https://github.com/${profile}`}
                            >
                              {profile.length > 15 ? profile.slice(0, 17) + "..." : profile}
                            </a>
                          </Popover>

                          <span className="mx-1 text-[#57606a]">/</span>

                          <a
                            className="truncate font-medium text-[#1f2328] hover:text-[#0969da] hover:underline transition-colors"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://github.com/${profile}/${repoName}`}
                          >
                            {repoName}
                          </a>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            isFavorite(issue) ? removeFavorite(issue) : addFavorite(issue)
                          }
                          aria-label="Toggle Favorite"
                          className={`inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] px-2 py-1 text-xs font-medium bg-white transition-colors ${
                            isFavorite(issue)
                              ? "text-[#cf222e] hover:bg-[#ffebe9]"
                              : "text-[#24292f] hover:bg-[#f6f8fa]"
                          }`}
                        >
                          <HeartIcon />
                          <span>{isFavorite(issue) ? "Unfavorite" : "Favorite"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Issue title row */}
                    <div className="mt-1 flex items-center gap-2 px-4">
                      <IssueOpenedIcon className="shrink-0 text-[#1a7f37]" />
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={issue.html_url}
                        className="truncate font-semibold leading-6 text-[#1f2328] hover:text-[#0969da] transition-colors"
                        title={issue.title}
                      >
                        {issue.title}
                      </a>
                    </div>

                    {/* Optional description */}
                    {issue.body && (
                      <p className="mt-1 line-clamp-2 px-8 pr-4 text-sm text-[#57606a]">
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
                          <span className="ml-2 text-xs text-[#57606a]">
                            {issue.assignees.length} assignee{issue.assignees.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-[#1a7f37]">{strings.NoAssignee}</span>
                      )}

                      <span className="hidden sm:inline text-[#d0d7de]">•</span>

                      {/* Language */}
                      {issue.repository_language && (
                        <span className="flex items-center gap-1.5 text-xs text-[#57606a]">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#57606a]" />
                          {issue.repository_language}
                        </span>
                      )}

                      {/* Star count */}
                      {typeof issue.repository_stars === "number" && (
                        <>
                          <span className="hidden sm:inline text-[#d0d7de]">•</span>
                          <a
                            href={`https://github.com/${profile}/${repoName}/stargazers`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#57606a] hover:text-[#0969da] transition-colors"
                          >
                            <StarIcon />
                            <span className="tabular-nums">{issue.repository_stars.toLocaleString()}</span>
                          </a>
                        </>
                      )}

                      {/* Updated */}
                      {issue.updated_at && (
                        <>
                          <span className="hidden sm:inline text-[#d0d7de]">•</span>
                          <span className="text-xs text-[#57606a]">
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
            <div className="w-full flex flex-col justify-center items-center py-6 mt-4 border border-[#ffcecb] bg-[#ffebe9] rounded-md text-center">
              <p className="text-sm text-[#82071e] mb-2">{strings.listItemError}</p>
              <button
                onClick={onRetryButtonClick}
                className="bg-white border border-[#d0d7de] rounded-md py-[5px] px-4 text-[#24292f] text-xs font-medium hover:bg-[#f3f4f6] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <FontAwesomeIcon
                    size={"sm"}
                    className={"animate-spin"}
                    icon={faCircleNotch}
                  />
                ) : null}
                <span>{strings.listItemReloadButtonLabel}</span>
              </button>
            </div>
          ) : (
            <div
              ref={loaderRef}
              className="w-full flex flex-col justify-center items-center text-center py-8 text-[#57606a]"
            >
              <FontAwesomeIcon
                size={"lg"}
                className={"animate-spin"}
                icon={faCircleNotch}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
