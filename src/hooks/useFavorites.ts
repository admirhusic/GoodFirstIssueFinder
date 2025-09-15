import { useEffect, useState } from "react";
import { GitHubIssue } from "../types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<GitHubIssue[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favouriteIssues");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to localStorage only AFTER initial load
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favouriteIssues", JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addFavorite = (issue: GitHubIssue) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.html_url === issue.html_url)) return prev;
      return [...prev, issue];
    });
  };

  const removeFavorite = (issueToRemove: GitHubIssue) => {
    setFavorites((prev) =>
      prev.filter((issue) => issue.html_url !== issueToRemove.html_url)
    );
  };

  const isFavorite = (issue: GitHubIssue) => {
    return favorites.some((i) => i.html_url === issue.html_url);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
