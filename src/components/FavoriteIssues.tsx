import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import IssueOpenedIcon from "../icons/IssueOpenedIcon";
import HeartIcon from "../icons/HeartIcon";
import Popover from "./Popover";
import UserProfilePopoverContent from "./popover/UserProfilePopoverContent";
import { useFavorites } from "../hooks/useFavorites";
import Navbar from "./Navbar";
import { strings } from "../strings";

const FavoriteIssues = () => {
  const { favorites, removeFavorite } = useFavorites();

  const issues = favorites;

  if (!issues) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] text-[#1f2328] flex flex-col">
        <Navbar />
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12 flex flex-col justify-center items-center">
          <FontAwesomeIcon
            size="2x"
            className="animate-spin text-[#0969da]"
            icon={faCircleNotch}
          />
        </main>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] text-[#1f2328] flex flex-col">
        <Navbar />
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12">
          <div className="text-center py-16 bg-white rounded-md border border-[#d0d7de]">
            <FontAwesomeIcon
              icon={faHeartSolid}
              className="text-[#d0d7de] text-5xl mb-4"
            />
            <p className="text-[#57606a] font-medium">{strings.noFavoriteIssues}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] text-[#1f2328] flex flex-col">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-[#1f2328]">
              {strings.favoriteIssues}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#ddf4ff] text-[#0550ae] rounded-full">
              {issues.length} {issues.length === 1 ? "issue" : "issues"}
            </span>
          </div>
          <ul className="w-full space-y-3">
            {issues.map((issue, idx) => {
              const urlParts = issue.html_url.split("/");
              const profile = urlParts[3] || "";
              const repoName = urlParts[4] || "";

              return (
                <li key={issue.html_url + idx}>
                  <div className="group relative w-full rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] transition-colors">
                    {/* Header: Repo owner/repo and unfavorite button */}
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
                              {profile}
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

                      <button
                        onClick={() => removeFavorite(issue)}
                        type="button"
                        aria-label="Remove from favorites"
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] px-2.5 py-1 text-xs font-medium text-[#cf222e] bg-white hover:bg-[#ffebe9] transition-colors"
                      >
                        <HeartIcon />
                        <span>{strings.btnUnfavorite}</span>
                      </button>
                    </div>

                    {/* Title */}
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

                    {/* Description */}
                    {issue.body && (
                      <p className="mt-1 line-clamp-2 px-8 pr-4 text-sm text-[#57606a]">
                        {issue.body}
                      </p>
                    )}

                    {/* Metadata */}
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
                            {issue.assignees.length} assignee
                            {issue.assignees.length > 1 ? "s" : ""}
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

                      {/* Updated Date */}
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
        </div>
      </main>
    </div>
  );
};

export default FavoriteIssues;
