import React from "react";

export default function SearchInput() {
    return (
        <div className={"sm:w-full md:w-1/2 lg:w-1/2 mx-auto"}>
            <input
                className="shadow appearance-none border border-blue-950 rounded sm:w-full md:w-full lg:w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="filter-input" type="text" placeholder="filter issues"/>
        </div>
    )
}