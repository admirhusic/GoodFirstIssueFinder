import React from "react";
import { LogoGithubIcon, MarkGithubIcon } from "@primer/octicons-react";
import { strings } from "../strings";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";

export default function Navbar() {
  return (
    <nav className="bg-blue-950 text-white py-3 px-4 fixed top-0 left-0 right-0 w-full z-40 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-row items-center justify-between">
        <Link to="/" className="flex flex-row items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-lg">{strings.logoText}</span>
        </Link>
        <div>
          <ul className="flex flex-row gap-6 items-center text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-blue-200 transition-colors">
                {strings.navFavorites}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/admirhusic/GoodFirstIssueFinder"
            className="hover:text-blue-200 transition-colors flex items-center"
            aria-label="GitHub Repository"
          >
            <MarkGithubIcon size={22} />
          </a>
        </div>
      </div>
    </nav>
  );
}
