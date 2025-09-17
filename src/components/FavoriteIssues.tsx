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

  const langDotClass = (lang?: string | null) =>
    "inline-block h-2 w-2 rounded-full bg-gray-400";

  if (!issues) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <FontAwesomeIcon
          size="2x"
          className="animate-spin text-gray-400"
          icon={faCircleNotch}
        />
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="flex flex-col space-y-7">
        <div>
        <Navbar />
        </div>

      <div className="text-center py-12">
        <FontAwesomeIcon
          icon={faHeartSolid}
          className="text-gray-300 text-4xl mb-4"
          />
        <p className="text-gray-500">{strings.noFavoriteIssues}</p>
      </div>
          </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5">
        <Navbar />

    
    <div className="sm:w-full w-[95vw] md:w-1/2 lg:w-1/2 mx-auto rounded pt-8">
      <div className="pb-6">
        <h1 className="text-xl font-semibold mb-4 text-gray-900">
          {strings.favoriteIssues} ({issues.length})
        </h1>
        <ul className="mx-auto max-w-5xl">
          {issues.map((issue, idx) => {
            const [_, owner = "", repo = ""] = issue.html_url.split("github.com/");
            const profile = owner?.split("/")[0] || "";
            const repoName = repo?.split("/")[0] || "";

            return (
              <li key={issue.html_url + idx} className="mb-3">
                <div className="group relative w-full rounded-lg border bg-white shadow-sm hover:shadow transition-shadow ring-0 hover:ring-1 hover:ring-gray-200">
                  {/* Header: Repo owner/repo and unfavorite button */}
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

                    <button
                      onClick={() => removeFavorite(issue)}
                      type="button"
                      aria-label="Remove from favorites"
                      className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50 active:bg-red-100"
                    >
                      <HeartIcon />
                      <span>{strings.btnUnfavorite}</span>
                    </button>
                  </div>

                  {/* Title */}
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

                  {/* Description */}
                  {issue.body && (
                    <p className="mt-1 line-clamp-2 px-8 pr-4 text-sm text-gray-700">
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
                        <span className="ml-2 text-xs text-gray-600">
                          {issue.assignees.length} assignee
                          {issue.assignees.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-green-600">{strings.NoAssignee}</span>
                    )}

                    {/* Separator */}
                    <span className="hidden sm:inline text-gray-300">•</span>

                    {/* Language */}
                    {issue.repository_language && (
                      <span className="flex items-center gap-2 text-xs text-gray-700">
                        <span className={langDotClass(issue.repository_language)} />
                        {issue.repository_language}
                      </span>
                    )}

                    {/* Updated Date */}
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
      </div>
    </div>
    </div>
  );
};

export default FavoriteIssues;
