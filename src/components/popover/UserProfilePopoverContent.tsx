import React from "react";
import { GitHubIssue } from "../../types";

export interface UserProfilePopoverContentI {
  issue: GitHubIssue;
}

export default function UserProfilePopoverContent(props: GitHubIssue) {
  return (
    <div className={"bg-gray-200 text-black rounded p-1 flex flex-col w-20"}>
      <img
        alt={props.user.login}
        className={"rounded w-full mx-auto"}
        src={props.user.avatar_url}
      />
    </div>
  );
}
