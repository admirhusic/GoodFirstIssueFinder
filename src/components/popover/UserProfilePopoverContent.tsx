import React, { useEffect, useState } from "react";
import { GitHubIssue, GitHubUser } from "../../types";

interface UserProfilePopoverContentProps {
  issue: GitHubIssue;
  users: GitHubUser;
}

export   default function UserProfilePopoverContent({ issue }: UserProfilePopoverContentProps) {
  const { user } = issue;
  const [userStats, setUserStats] = useState<{ repos: number; followers: number; following: number; bio: string | null } | null>(null);

  useEffect(() => {
    if (user?.login) {
      fetch(`https://api.github.com/users/${user.login}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user data:", data);
          setUserStats({
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            bio: data.bio,
          });
        })
        .catch((err) => console.error("Error fetching user stats:", err));
    }
  }, [user?.login]);

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 w-64">
      {/* Avatar + Username */}
      <div className="flex items-center gap-3">
        <img
          alt={user.login}
          src={user.avatar_url}
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <p className="font-semibold text-gray-900">{user.login}</p>
          {user.html_url && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View Profile
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {userStats && (
        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
          {userStats.bio ?? "No bio available"}
        </p>
      )}

      {/* Stats */}
      <div className="flex justify-between mt-4 text-xs text-gray-600">
        <span>Repos: {userStats?.repos ?? "-"}</span>
        <span>Followers: {userStats?.followers ?? "-"}</span>
        <span>Following: {userStats?.following ?? "-"}</span>
      </div>
    </div>
  );
}
