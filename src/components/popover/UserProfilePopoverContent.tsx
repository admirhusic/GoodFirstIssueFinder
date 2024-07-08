import React from "react";
import { GitHubIssue } from "../../types";

export interface UserProfilePopoverContentI {
  issue: GitHubIssue;
}

export default function UserProfilePopoverContent({ user }: GitHubIssue) {
  const profile = `${user.html_url.split("/")[3]}`;
  return (
    <div className={"bg-gray-200 text-black rounded p-3 flex flex-col"}>
      <img
        alt={profile}
        className={"rounded h-10 w-10"}
        src={user.avatar_url}
      />
      {profile}
    </div>
  );
}
