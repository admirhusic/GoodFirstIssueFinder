import React from "react";
import { LogoGithubIcon, MarkGithubIcon } from "@primer/octicons-react";
import { strings } from "../strings";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";

export default function Navbar() {
  return (
    <nav className={"bg-blue-950 text-white p-3 flex flex-row fixed w-full z-50"}>
      <div
        className={
          "container mx-auto flex flex-row items-center justify-between"
        }
      >
        <div className="flex flex-row items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-lg">{strings.logoText}</span>
        </div>
        <div>
          

          <ul className="flex flex-row gap-4">
            {/* <li></li> This can be used for further routing */} 
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>

         
        </div>
        <div>
          <a
            target={"_blank"}
            href="https://github.com/admirhusic/GoodFirstIssueFinder"
          >
            <MarkGithubIcon size={22} />
          </a>
        </div>
      </div>
    </nav>
  );
}
