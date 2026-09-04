import React from "react";
import { GitHubIssue } from "../../types";

export default function UserProfilePopoverContent(props: GitHubIssue) {
  return (
    <div className="bg-white border border-[#d0d7de] rounded-md shadow-[0_8px_24px_rgba(140,149,159,0.2)] p-3 flex flex-col items-center gap-2 w-36">
      <img
        alt={props.user.login}
        className="rounded-full w-10 h-10"
        src={props.user.avatar_url}
      />
      <span className="text-xs font-semibold text-[#1f2328]">@{props.user.login}</span>
    </div>
  );
}
