import React from "react";
import { LogoGithubIcon, MarkGithubIcon } from "@primer/octicons-react";
import { strings } from "../strings";

export default function Navbar() {
  return (
    <nav className={"bg-blue-950 text-white p-3 flex flex-row fixed w-full z-50"}>
      <div
        className={
          "container mx-auto flex flex-row items-center justify-between"
        }
      >
        <div>
          <span>{strings.logoText}</span> {/**  We are waiting for your logo design ;) */}
        </div>
        <div>
          {/*

          // Future navigation will be here
          <ul>
            <li></li>
            <li></li>
          </ul>

          */}
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
