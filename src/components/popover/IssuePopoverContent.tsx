import React from "react";
import { GitHubIssue } from "../../types";

interface IssuePopoverContentProps {
  issue: GitHubIssue;
}

export default function IssuePopoverContent({ issue }: IssuePopoverContentProps) {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 w-72">
      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{issue.title}</h3>

      {/* State + Created */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span
          className={`px-2 py-0.5 rounded-full text-white ${
            issue.state === "open" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {issue.state}
        </span>
        <span>Opened on {new Date(issue.created_at).toLocaleDateString()}</span>
      </div>

      {/* Body (short) */}
      {issue.body && (
        <p className="text-sm text-gray-700 line-clamp-3">{issue.body}</p>
      )}

      {/* Comments + Updated */}
      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <span>💬 {issue.comments} comments</span>
        <span>Updated {new Date(issue.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
