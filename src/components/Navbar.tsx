import React from "react";
import { strings } from "../strings";

export default function Navbar() {
  return (
    <nav className={"bg-blue-950 text-white p-3 flex flex-row fixed w-full"}>
      <div className={""}>
        <span>{strings.logoText}</span>
      </div>
    </nav>
  );
}
